// import React, { useState } from "react";

// const BlogListing = ({ blogs = [] }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(blogs.length / itemsPerPage);
//   const currentItems = blogs.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   if (!blogs.length) {
//     return (
//       <p className="text-center text-lg text-gray-600 mt-10">No blogs found</p>
//     );
//   }

//   return (
//     <div className="px-4 py-6">
//       <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
//         <h1 className="text-3xl font-extrabold text-gray-800">Blogs</h1>
//       </div>

//       {/* Blog Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {currentItems.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white shadow rounded-xl overflow-hidden transition hover:shadow-lg cursor-pointer"
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
//                 {item.category}
//               </span>
//               <h2 className="mt-2 text-lg font-semibold text-gray-800">
//                 {item.title}
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">{item.author}</p>
//               <p className="text-sm text-gray-600 mt-2 line-clamp-3">
//                 {item.description}
//               </p>
//               <p className="text-xs text-gray-400 mt-2">
//                 {new Date(item.date).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-8">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="font-medium">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogListing;
import React, { useState } from "react";

const BlogListing = ({ blogs = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const currentItems = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!blogs.length) {
    return (
      <p className="text-center text-lg text-gray-600 mt-10">No blogs found</p>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Blogs</h1>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-xl overflow-hidden transition hover:shadow-lg cursor-pointer"
          >
            {item.video ? (
              <video
                src={item.video}
                controls
                className="w-full h-40 object-cover"
              />
            ) : item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            ) : (
              <img
                src="https://via.placeholder.com/100x100.png?text=No+Media"
                alt="No media"
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                {item.category}
              </span>
              <h2 className="mt-2 text-lg font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{item.author}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {item.description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
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

export default BlogListing;
