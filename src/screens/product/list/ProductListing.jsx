<<<<<<< Updated upstream
  import React, { useState } from "react";
  import { Star, StarHalf, Plus, Minus } from "lucide-react";
  import AtmSearchField from "../../../component/atom/AtmSearchField";
  import ProductDetailsDrawer from "../../../component/molecule/ProductDetailsDrawer";

  const ProductListing = ({
    products = [],
    onDelete = () => {},
    onAddProduct = () => {},
  }) => {
    const [search, setSearch] = useState("");
    const [quantities, setQuantities] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);

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
                className="cursor-pointer bg-white shadow rounded-xl relative overflow-hidden transition hover:shadow-lg p-3 flex flex-col"
                onClick={() => setSelectedProduct(item)}
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
                  onClick={() => setSelectedProduct(item)}
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
                        onAddProduct({ ...item, quantity });
                      }}
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

        {/* Product Drawer */}
        {selectedProduct && (
          <ProductDetailsDrawer
            open={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            product={selectedProduct}
          />
        )}
=======
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductListingWrapper = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 8;
  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3300";

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Product Listing</h2>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search product by name..."
        className="border px-4 py-2 rounded mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded p-3 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold mt-1">₹{product.price}</p>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
>>>>>>> Stashed changes
      </div>
    );
  };

<<<<<<< Updated upstream
  export default ProductListing;
=======
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListingWrapper;
>>>>>>> Stashed changes
