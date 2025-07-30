import React, { useState } from "react";
import { Star, StarHalf, Plus, Minus } from "lucide-react";
import AtmSearchField from "../../../component/atom/AtmSearchField";

const ProductListing = ({
  products = [],
  onDelete = () => {},
  onAddProduct = () => {},
}) => {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!filteredProducts.length) {
    return (
      <p className="text-center text-lg text-gray-600 mt-10">
        No products found
      </p>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
        <div className="w-full sm:w-[300px]">
          <AtmSearchField
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((item) => {
          const quantity = quantities[item.id] || 1;
          const discountedPrice = item.price - (item.discount || 0);
          const discountPercent =
            Math.round((item.discount / item.price) * 100) || 0;

          return (
            <div
              key={item.id}
              className="bg-white shadow rounded-xl relative overflow-hidden transition hover:shadow-lg p-3 flex flex-col"
            >
              {/* Discount Badge */}
              {item.discount ? (
                <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-bl-md">
                  {discountPercent}% OFF
                </span>
              ) : null}

              {/* Image */}
              <img
                src={item.image || "/default-image.png"}
                alt={item.name}
                className="w-full h-36 object-contain bg-gray-50 rounded-md"
              />

              {/* Content */}
              <div className="mt-3 flex-grow flex flex-col justify-between">
                <div>
                  {/* Category */}
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                    {item.category || "General"}
                  </span>

                  {/* Name */}
                  <h2 className="mt-1 text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </h2>

                  {/* Price */}
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">
                      ₹{discountedPrice}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-1 text-yellow-400">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        stroke="none"
                      />
                    ))}
                    <StarHalf size={14} fill="currentColor" stroke="none" />
                  </div>
                </div>

                {/* Quantity + Cart Button */}
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => onAddProduct({ ...item, quantity })}
                    className="w-full border border-red-500 text-red-500 text-sm rounded py-1.5 hover:bg-red-50 transition"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListing;
