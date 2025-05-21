import React, { useState } from 'react';
import AddEditModal from './AddEditModal';

const LandingPage = ({ onAddTodo, onGetSummary }) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddTodoClick = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const handleAddSubmit = (todo) => {
    onAddTodo(todo);
    closeAddModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 flex flex-col justify-center items-center text-white px-6">
      <h1 className="text-5xl font-extrabold mb-16 text-center drop-shadow-lg">
        Welcome to <span className="text-yellow-300">Summary Assistant</span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl justify-center items-center">
        <a
          href="/todos"
          className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold px-6 py-5 rounded-lg shadow-md w-48 text-center transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M9 12h6m-6 4h6m-6-8h6M4 6h16M4 18h16" />
            </svg>
            Show Todos
          </div>
        </a>

        <button
          onClick={handleAddTodoClick}
          className="bg-white text-purple-600 hover:bg-purple-100 font-semibold px-6 py-5 rounded-lg shadow-md w-48 text-center transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Todo
          </div>
        </button>

        <button
          onClick={onGetSummary}
          className="bg-white text-pink-600 hover:bg-pink-100 font-semibold px-6 py-5 rounded-lg shadow-md w-48 text-center transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0H5"
              />
            </svg>
            Get Summary
          </div>
        </button>
      </div>

      
      <AddEditModal
        show={addModalOpen}
        onClose={closeAddModal}
        onSubmit={handleAddSubmit}
      />
    </div>
  );
};

export default LandingPage;
