import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-blue-500 hover:text-white border-gray-300 text-gray-700"
        }`}
      >
        Prev
      </button>

      {/* Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
            currentPage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white hover:bg-blue-500 hover:text-white border-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-blue-500 hover:text-white border-gray-300 text-gray-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
