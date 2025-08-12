import React, { useState } from "react";
import { useGetWishlistQuery } from "../slice/WishListApiSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const API_URL = import.meta.env.VITE_APP_BASE_URL;
const ITEMS_PER_PAGE = 8;

const Wishlist = () => {
  const { data, isLoading } = useGetWishlistQuery();
  const wishlistProducts = data?.data?.products || [];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(wishlistProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = wishlistProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Please log in to add products to your cart.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/cart/add`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.status) {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-lg text-gray-500">
        Loading wishlist...
      </p>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
          ❤️ My Wishlist
        </h2>

        {wishlistProducts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No items in wishlist.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => {
                const imageUrl = product.image
                  ? `${BASE_URL}/uploads/${product.image.replace(/\\/g, "/")}`
                  : "/default-image.png";

                return (
                  <div
                    key={product._id}
                    className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
                  >
                    <img
                      src={imageUrl}
                      alt={product.productName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h5 className="text-lg font-semibold mb-2">
                        {product.productName}
                      </h5>
                      <p className="text-sm text-gray-500 mb-1">
                        <del>₹{product.mrp}</del>{" "}
                        <span className="text-gray-900 font-bold ml-2">
                          ₹{product.rate}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Brand: {product.brand}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="mt-auto border border-blue-500 text-blue-600 px-4 py-2 rounded hover:bg-sky-100 transition duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 rounded border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded border ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 rounded border ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
};

export default Wishlist;
