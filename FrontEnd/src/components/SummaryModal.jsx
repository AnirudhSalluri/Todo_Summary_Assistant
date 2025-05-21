import React from 'react';

const SummaryModal = ({ summary, onClose }) => {
  return (
    <>
      
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      />

     
      <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-11/12 p-6 pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <h2 id="modal-title" className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Summary
          </h2>
          <pre
            id="modal-desc"
            className="whitespace-pre-wrap mb-6 text-gray-700 dark:text-gray-300"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {summary}
          </pre>

          <button
            onClick={onClose}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default SummaryModal;
