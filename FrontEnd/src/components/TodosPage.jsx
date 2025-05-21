import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoCard from './TodoCard';
import AddEditModal from './AddEditModal';
import api from '../api'; // Your axios or fetch wrapper

const TodosPage = ({ onBack }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [summary, setSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false); // ✅ Missing state added

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (err) {
      toast.error('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await api.put(`/updateTodo/${id}`, { completed: !todo.completed });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      toast.success(`Todo marked as ${!todo.completed ? 'complete' : 'incomplete'}`);
    } catch {
      toast.error('Failed to update todo');
    }
  };

  const confirmDelete = (todo) => {
    setTodoToDelete(todo);
    console.log(todo)
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!todoToDelete) return;
    setDeleting(true);
    try {
      await api.delete(`/deleteTodo/${todoToDelete}`);
      setTodos((prev) => prev.filter((t) => t.id !== todoToDelete));
      toast.success('Todo deleted successfully');
    } catch {
      toast.error('Failed to delete todo');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setTodoToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setTodoToDelete(null);
  };

  const openAddModal = () => {
    setEditTodo(null);
    setModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditTodo(todo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTodo(null);
  };

  const addOrUpdateTodo = async (todo) => {
    try {
      if (todo.id) {
        // Update existing
        const res = await api.put(`/updateTodo/${todo.id}`, { title: todo.title });
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? res.data : t))
        );
        toast.success('Todo updated successfully');
      } else {
        // Add new
        const res = await api.post('/addTodo', { title: todo.title });
        setTodos((prev) => [res.data, ...prev]);
        toast.success('Todo added successfully');
      }
      closeModal();
    } catch {
      toast.error('Failed to save todo');
    }
  };

  const getSummary = async () => {
    setSummaryLoading(true);
    try {
      const res = await api.post('/summarize', { todos });
      setSummary(res.data.summary || 'No summary available');
      setShowSummary(true);
    } catch {
      toast.error('Failed to generate summary');
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl font-bold">Your Todos</h1>

        <div className="space-x-3">
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Todo
          </button>
          <button
            onClick={getSummary}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={summaryLoading}
          >
            Summarize
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading todos...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-400">No todos found. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={toggleComplete}
              onEdit={openEditModal}
              onDelete={confirmDelete}
            />
          ))}
        </div>
      )}

      <AddEditModal
        show={modalOpen}
        onClose={closeModal}
        onSubmit={addOrUpdateTodo}
        todo={editTodo}
      />

      
      {showSummary && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-40"
            onClick={() => {
              if (!summaryLoading) setShowSummary(false);
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full text-white">
              <h2 className="text-2xl font-semibold mb-4">Summary</h2>
              {summaryLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-dotted rounded-full animate-spin"></div>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap max-h-64 overflow-auto mb-6">{summary}</pre>
              )}
              <button
                onClick={() => setShowSummary(false)}
                className={`px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 ${
                  summaryLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={summaryLoading}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      
      {showDeleteModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleDeleteCancel}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Deletion</h2>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete this todo?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodosPage;
