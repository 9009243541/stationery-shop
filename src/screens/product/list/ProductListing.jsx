import React, { useState, useMemo, useCallback } from "react";
import { Star, StarHalf, Plus, Minus, Heart } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash/debounce";
import SkeletonCard from "../SkeletonCard.jsx";
import AtmSearchField from "../../../component/atom/AtmSearchField";
import ProductDetailsDrawer from "../../../component/molecule/ProductDetailsDrawer";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
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
  const [selectedCategories, setSelectedCategories] = useState([]);
console.log(selectedCategories,'selectedCategories')
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
      toast.error("Failed to add to cart", { position: "bottom-right" });
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const categories = useMemo(
    () => [...new Set(products.map((item) => item.category || "General"))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category || "General");
      return matchesSearch && matchesCategory;
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
  }, [products, search, sortOption, selectedCategories]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
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
        <div className="mb-6 flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
            ></div>
          ))}
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

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedCategories.includes(category)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
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
