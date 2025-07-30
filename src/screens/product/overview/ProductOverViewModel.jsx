import React from "react";

const ProductOverviewModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        <img
          src={product.image || "/default-image.png"}
          alt={product.name}
          className="w-full h-52 object-contain bg-gray-100 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-2">Price: ₹{product.price}</p>
        <p className="text-gray-700 mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductOverviewModal;
