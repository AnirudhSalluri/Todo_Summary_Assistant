import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from './components/LandingPage';
import TodosPage from './components/TodosPage';
import SummaryModal from './components/SummaryModal';
import api from './api';

const AppRoutes = () => {
  const [todos, setTodos] = useState([]);
  const [summary, setSummary] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const navigate = useNavigate();

  const refreshTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch {
      toast.error('Failed to load todos');
    }
  };

  const handleAddTodo = async (todo) => {
    try {
      await api.post('/addTodo', { title: todo.title });
      toast.success(' Todo added!');
    } catch {
      toast.error(' Failed to add todo');
    }
  };

  const handleGetSummary = async () => {
    try {
      setIsLoadingSummary(true);
      const resTodos = await api.get('/todos');
      const latestTodos = resTodos.data;

      if (!latestTodos.length) {
        toast.warning('No todos to summarize');
        setIsLoadingSummary(false);
        return;
      }

      const resSummary = await api.post('/summarize', { todos: latestTodos });
      setSummary(resSummary.data.summary || 'No summary available');
      setShowSummaryModal(true);
    } catch {
      toast.error('Failed to get summary');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const closeSummaryModal = () => {
    setShowSummaryModal(false);
    setSummary('');
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onAddTodo={handleAddTodo}
              onGetSummary={handleGetSummary}
            />
          }
        />
        <Route
          path="/todos"
          element={
            <TodosPage
              todos={todos}
              refreshTodos={refreshTodos}
              onBack={() => navigate('/')}
            />
          }
        />
      </Routes>

      
      {showSummaryModal && (
        <SummaryModal summary={summary} onClose={closeSummaryModal} />
      )}

     
      {isLoadingSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-gray-700 font-semibold text-lg">
              Loading summary...
            </span>
          </div>
        </div>
      )}

      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
