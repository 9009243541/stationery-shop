import React, { useState, useMemo, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash/debounce";
import SkeletonCard from "../SkeletonCard.jsx";
import AtmSearchField from "../../../component/atom/AtmSearchField";
import ProductDetailsDrawer from "../../../component/molecule/ProductDetailsDrawer";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
import { useNavigate } from "react-router-dom";

const ProductListing = ({
  products = [],
  onDelete = () => {},
  onAddProduct = () => {},
  isLoading = false,
  isError = false,
}) => {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const [isTogglingWishlist, setIsTogglingWishlist] = useState({});
  const [sortOption, setSortOption] = useState("default");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const toggleWishlist = async (e, productId) => {
    e.stopPropagation();
    setIsTogglingWishlist((prev) => ({ ...prev, [productId]: true }));
    const isWished = wishlist[productId];

    try {
      const url = `${BASE_URL}/wishlist/${isWished ? "remove" : "add"}`;
      await axios.post(
        url,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWishlist((prev) => ({
        ...prev,
        [productId]: !isWished,
      }));

      toast.success(isWished ? "Removed from wishlist" : "Added to wishlist", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Wishlist API error:", error);
      toast.error("Wishlist update failed", { position: "bottom-right" });
    } finally {
      setIsTogglingWishlist((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const addToCart = async (productId, quantity) => {
    setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));
    try {
      await axios.post(
        `${BASE_URL}/cart/add`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("🛒 Added to cart!", { position: "bottom-right" });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart Please login first", {
        position: "bottom-right",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    if (sortOption === "price-low-high") {
      filtered.sort(
        (a, b) =>
          a.price * (1 - (a.discount || 0) / 100) -
          b.price * (1 - (b.discount || 0) / 100)
      );
    } else if (sortOption === "price-high-low") {
      filtered.sort(
        (a, b) =>
          b.price * (1 - (b.discount || 0) / 100) -
          a.price * (1 - (a.discount || 0) / 100)
      );
    }

    return filtered;
  }, [products, search, sortOption]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  if (isError) {
    return (
      <p className="text-center text-red-500 py-5">Failed to load products</p>
    );
  }

  if (isLoading) {
    return (
      <div className="px-4 py-6 relative">
        <ToastContainer />
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="h-10 w-full sm:w-[300px] bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!filteredProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        {/* Icon */}
        <div className="bg-blue-100 rounded-full p-6 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21h4"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Products Found
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 max-w-md mb-6">
          We couldn’t find any products matching your search. Try adjusting your
          filters or search term.
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            setSearch("");
            setSortOption("default");
            setCurrentPage(1);
          }}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 relative">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <AtmSearchField
            name="search"
            value={search}
            onChange={(e) => debouncedSetSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full sm:w-[300px]"
          />
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Sort: Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            quantities={quantities}
            wishlist={wishlist}
            handleQuantityChange={handleQuantityChange}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            setSelectedProduct={setSelectedProduct}
            isAddingToCart={isAddingToCart}
            isTogglingWishlist={isTogglingWishlist}
          />
        ))}
      </div>

      {/* Pagination */}
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
