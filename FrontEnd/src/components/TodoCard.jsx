import React from 'react';

const TodoCard = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-md border 
        transition-all duration-300 ease-in-out
        bg-gradient-to-br from-white to-blue-50 hover:from-blue-100 hover:to-blue-200 
        flex flex-col items-center gap-5 
        ${todo.completed ? 'opacity-70 line-through' : 'opacity-100'}`}
    >
     
      <h3 className="text-xl font-bold text-center text-gray-900 break-words w-full">
        {todo.title}
      </h3>

      
      <div className="flex flex-col items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="sr-only peer"
          />
          <div className="w-16 h-8 bg-blue-300 peer-checked:bg-teal-500 rounded-full peer peer-focus:ring-4 ring-teal-200 transition duration-300"></div>
          <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md transform peer-checked:translate-x-8 transition-transform duration-300 ease-in-out"></div>
        </label>
        <span
          className={`text-sm font-medium ${
            todo.completed ? 'text-teal-700' : 'text-amber-600'
          }`}
        >
          {todo.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

     
      <div className="flex justify-between items-center w-full mt-4">
        <button
          onClick={() => onEdit(todo)}
          className="text-blue-600 hover:text-blue-800 font-semibold transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-600 hover:text-red-800 font-semibold transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
