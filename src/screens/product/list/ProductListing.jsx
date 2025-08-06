import React, { useState } from "react";
import { Star, StarHalf, Plus, Minus, Heart } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AtmSearchField from "../../../component/atom/AtmSearchField";
import ProductDetailsDrawer from "../../../component/molecule/ProductDetailsDrawer";
import axios from "axios";

const ProductListing = ({
  products = [],
  onDelete = () => {},
  onAddProduct = () => {},
}) => {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");
  const BASE_URL = "https://tbtdj99v-3300.inc1.devtunnels.ms";

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const toggleWishlist = async (e, productId) => {
    e.stopPropagation();
    const isWished = wishlist[productId];

    try {
      const url = `${BASE_URL}/wishlist/${isWished ? "remove" : "add"}`;
      await axios.post(
        url,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setWishlist((prev) => ({
        ...prev,
        [productId]: !isWished,
      }));

      toast.success(
        isWished ? "Removed from wishlist" : "Added to wishlist",
        { position: "top-right" }
      );
    } catch (error) {
      console.error("Wishlist API error:", error);
      toast.error("Wishlist update failed", { position: "top-right" });
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/cart/add`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("🛒 Added to cart!", { position: "bottom-right" });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart", { position: "bottom-right" });
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  if (!filteredProducts.length) {
    return (
      <p className="text-center text-lg text-gray-600 mt-10">
        No products found
      </p>
    );
  }

  return (
    <div className="px-4 py-6 relative">
      <ToastContainer />

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
        <div className="w-full sm:w-[300px]">
          <AtmSearchField
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 when searching
            }}
            placeholder="Search products..."
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((item) => {
          const quantity = quantities[item.id] || 1;
          const discountedPrice = item.price - (item.discount || 0);
          const discountPercent = item.discount
            ? Math.round((item.discount / item.price) * 100)
            : 0;

          return (
            <div
              key={item.id}
              className="relative bg-white shadow rounded-xl overflow-hidden transition hover:shadow-lg p-3 flex flex-col cursor-pointer"
              onClick={() => setSelectedProduct(item)}
            >
              {item.discount && (
                <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md z-10">
                  {discountPercent}% OFF
                </span>
              )}

              <button
                className="absolute top-2 right-2 bg-white p-1 rounded-full z-10 hover:bg-red-100"
                onClick={(e) => toggleWishlist(e, item.id)}
              >
                {wishlist[item.id] ? (
                  <Heart className="text-red-500 fill-red-500" size={18} />
                ) : (
                  <Heart className="text-gray-400" size={18} />
                )}
              </button>

              <img
                src={item.image || "/default-image.png"}
                alt={item.name}
                className="w-full h-36 object-contain bg-gray-50 rounded-md"
              />

              <div className="mt-3 flex-grow flex flex-col justify-between">
                <div>
                  <span>{item._id}</span>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded ml-2">
                    {item.category || "General"}
                  </span>
                  <h2 className="mt-1 text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">
                      ₹{discountedPrice}
                    </span>
                    {item.discount && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1 text-yellow-400">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="none" />
                    ))}
                    <StarHalf size={14} fill="currentColor" stroke="none" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, -1);
                      }}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, 1);
                      }}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item.id, quantity);
                    }}
                    className="flex items-center gap-1 border border-red-500 text-red-500 text-sm rounded px-3 py-1.5 hover:bg-red-50 transition"
                     >
                    <FaShoppingCart size={16} />
                  </button>
                </div>
                {/* <button className="mt-3 bg-blue-600 text-white text-sm font-semibold rounded px-4 py-2 hover:bg-blue-700 transition">
                  place order 
                </button> */}

              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailsDrawer
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductListing;
