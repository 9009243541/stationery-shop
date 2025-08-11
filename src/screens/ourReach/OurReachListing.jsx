// src/pages/OurReach/OurReachListing.jsx
import React, { useState } from "react";

const OurReachListing = ({ reach }) => {
  const safeReach = Array.isArray(reach) ? reach : [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(safeReach.length / itemsPerPage);

  const currentItems = safeReach.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!safeReach.length) {
    return (
      <p className="text-center text-lg text-gray-600 mt-10">No data found</p>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Our Reach</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {item.icon && (
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 object-contain mb-4"
              />
            )}
            <h2 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-2xl font-bold text-blue-600">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OurReachListing;
