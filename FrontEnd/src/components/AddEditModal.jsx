import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddEditModal = ({ show, onClose, onSubmit, todo }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (todo) setTitle(todo.title);
    else setTitle('');
  }, [todo]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      toast.warning(' Title cannot be empty!');
      return;
    }

    onSubmit({ ...todo, title: trimmedTitle });
    setTitle('');
  };

  return (
    <>
     
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

    
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {todo ? 'Edit Todo' : 'Add Todo'}
          </h2>

          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {todo ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEditModal;
