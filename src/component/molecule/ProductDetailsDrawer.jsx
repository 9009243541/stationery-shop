import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const ProductDetailsDrawer = ({ open, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuantity(1); // Reset quantity when drawer opens
    }
  }, [open]);

  if (!open || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose} // Close when clicking outside
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-lg p-6 overflow-y-auto relative animate-slide-in"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X />
        </button>

        {/* Product Name */}
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

        {/* Product image */}
        <div className="flex justify-center mb-4">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="max-h-60 object-contain rounded"
          />
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-2">
          {product.description || "No description provided."}
        </p>

        {/* Price */}
        <p className="text-xl font-semibold mb-4 text-red-600">
          ₹{product.price}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="border px-3 py-1 rounded hover:bg-gray-100"
          >
            −
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="border px-3 py-1 rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full text-lg font-medium">
          Add {quantity} to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsDrawer;
