import React from "react";

const SkeletonCard = () => (
  <div className="relative bg-white shadow-md rounded-xl p-4 flex flex-col animate-pulse">
    <div className="w-full h-36 bg-gray-200 rounded-md"></div>
    <div className="mt-3 flex-grow flex flex-col justify-between">
      <div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
        <div className="flex items-center mt-2 gap-1">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-8 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;
