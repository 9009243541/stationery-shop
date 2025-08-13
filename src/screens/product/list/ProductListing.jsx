// import React, { useState } from "react";
// import { Star, StarHalf, Plus, Minus, Heart } from "lucide-react";
// import { FaShoppingCart } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import AtmSearchField from "../../../component/atom/AtmSearchField";
// import ProductDetailsDrawer from "../../../component/molecule/ProductDetailsDrawer";
// import axios from "axios";

// const ProductListing = ({
//   products = [],
//   onDelete = () => {},
//   onAddProduct = () => {},
// }) => {
//   const [search, setSearch] = useState("");
//   const [quantities, setQuantities] = useState({});
//   const [wishlist, setWishlist] = useState({});
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const token = localStorage.getItem("token");
//   const BASE_URL = import.meta.env.VITE_APP_BASE_URL ;

//   const handleQuantityChange = (id, delta) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max((prev[id] || 1) + delta, 1),
//     }));
//   };

//   const toggleWishlist = async (e, productId) => {
//     e.stopPropagation();
//     const isWished = wishlist[productId];

//     try {
//       const url = `${BASE_URL}/wishlist/${isWished ? "remove" : "add"}`;
//       await axios.post(
//         url,
//         { productId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setWishlist((prev) => ({
//         ...prev,
//         [productId]: !isWished,
//       }));

//       toast.success(
//         isWished ? "Removed from wishlist" : "Added to wishlist",
//         { position: "bottom-right" }
//       );
//     } catch (error) {
//       console.error("Wishlist API error:", error);
//       toast.error("Wishlist update failed", { position: "bottom-right" });
//     }
//   };

//   const addToCart = async (productId, quantity) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/cart/add`,
//         { productId, quantity },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.success("🛒 Added to cart!", { position: "bottom-right" });
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       toast.error("Failed to add to cart", { position: "bottom-right" });
//     }
//   };

//   const filteredProducts = products.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const itemsPerPage = 12;
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const currentItems = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
//   };

//   if (!filteredProducts.length) {
//     return (
//       <p className="text-center text-lg text-gray-600 mt-10">
//         No products found
//       </p>
//     );
//   }

//   return (
//     <div className="px-4 py-6 relative">
//       <ToastContainer />

//       <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
//         <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
//         <div className="w-full sm:w-[300px]">
//           <AtmSearchField
//             name="search"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1); // reset to page 1 when searching
//             }}
//             placeholder="Search products..."
//           />
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {currentItems.map((item) => {
//           const quantity = quantities[item.id] || 1;
//           const discountedPrice = (item.price * (1 - (item.discount || 0) / 100)).toFixed(2);
//           const discountPercent = item.discount || 0;

//           return (
//             <div
//               key={item.id}
//               className="relative bg-white shadow rounded-xl overflow-hidden transition hover:shadow-lg p-3 flex flex-col cursor-pointer"
//               onClick={() => setSelectedProduct(item)}
//             >
//               {item.discount && (
//                 <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md z-10">
//                   {discountPercent}% OFF
//                 </span>
//               )}

//               <button
//                 className="absolute top-2 right-2 bg-white p-1 rounded-full z-10 hover:bg-red-100"
//                 onClick={(e) => toggleWishlist(e, item.id)}
//               >
//                 {wishlist[item.id] ? (
//                   <Heart className="text-red-500 fill-red-500" size={18} />
//                 ) : (
//                   <Heart className="text-gray-400" size={18} />
//                 )}
//               </button>

//               <img
//                src={item.image || "/default-image.png"}
//                 alt={item.name}
//                 className="w-full h-36 object-contain bg-gray-50 rounded-md"
//               />

//               <div className="mt-3 flex-grow flex flex-col justify-between">
//                 <div>
//                   <span>{item._id}</span>
//                   <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded ml-2">
//                     {item.category || "General"}
//                   </span>
//                   <h2 className="mt-1 text-sm font-semibold text-gray-800 truncate">
//                     {item.name}
//                   </h2>
//                   <div className="mt-1 flex items-center gap-2">
//                     <span className="text-base font-bold text-gray-900">
//                       ₹{discountedPrice}
//                     </span>
//                     {item.discount && (
//                       <span className="text-xs text-gray-400 line-through">
//                         ₹{item.price}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center mt-1 text-yellow-400">
//                     {Array.from({ length: 4 }).map((_, i) => (
//                       <Star key={i} size={14} fill="currentColor" stroke="none" />
//                     ))}
//                     <StarHalf size={14} fill="currentColor" stroke="none" />
//                   </div>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleQuantityChange(item.id, -1);
//                       }}
//                       className="p-1 border rounded hover:bg-gray-100"
//                     >
//                       <Minus size={14} />
//                     </button>
//                     <span className="text-sm font-semibold">{quantity}</span>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleQuantityChange(item.id, 1);
//                       }}
//                       className="p-1 border rounded hover:bg-gray-100"
//                     >
//                       <Plus size={14} />
//                     </button>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart(item.id, quantity);
//                     }}
//                     className="flex items-center gap-1 border border-red-500 text-red-500 text-sm rounded px-3 py-1.5 hover:bg-red-50 transition"
//                      >
//                     <FaShoppingCart size={16} />
//                   </button>
//                 </div>
//                 {/* <button className="mt-3 bg-blue-600 text-white text-sm font-semibold rounded px-4 py-2 hover:bg-blue-700 transition">
//                   place order
//                 </button> */}

//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-8">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="font-medium">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {selectedProduct && (
//         <ProductDetailsDrawer
//           open={!!selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           product={selectedProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductListing;

//////////////////////////////////////////////

// import React, { useState, useMemo, useCallback } from "react";
// import { Star, StarHalf, Plus, Minus, Heart } from "lucide-react";
// import { FaShoppingCart } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import debounce from "lodash/debounce";

// import AtmSearchField from "../../../component/atom/AtmSearchField";
// import ProductDetailsDrawer from "../../../component/molecule/ProductDetailsDrawer";
// import axios from "axios";

// const ProductCard = ({
//   item,
//   quantities,
//   wishlist,
//   handleQuantityChange,
//   toggleWishlist,
//   addToCart,
//   setSelectedProduct,
//   isAddingToCart,
//   isTogglingWishlist,
// }) => {
//   const quantity = quantities[item.id] || 1;
//   const discountedPrice = (item.price * (1 - (item.discount || 0) / 100)).toFixed(2);
//   const discountPercent = item.discount || 0;

//   return (
//     <div
//       className="relative bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 flex flex-col cursor-pointer group"
//       onClick={() => setSelectedProduct(item)}
//     >
//       {item.discount && (
//         <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-md rounded-tr-md z-10 animate-pulse">
//           {discountPercent}% OFF
//         </span>
//       )}

//       <button
//         className={`absolute top-2 right-2 bg-white p-1 rounded-full z-10 hover:bg-red-100 ${isTogglingWishlist[item.id] ? "opacity-50 cursor-not-allowed" : ""}`}
//         onClick={(e) => toggleWishlist(e, item.id)}
//         disabled={isTogglingWishlist[item.id]}
//         aria-label={wishlist[item.id] ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`}
//       >
//         {wishlist[item.id] ? (
//           <Heart className="text-red-500 fill-red-500" size={18} />
//         ) : (
//           <Heart className="text-gray-400" size={18} />
//         )}
//       </button>

//       <img
//         src={item.image || "/default-image.png"}
//         alt={`Image of ${item.name}`}
//         loading="lazy"
//         className="w-full h-36 object-cover bg-gray-50 rounded-md transition-transform duration-300 group-hover:scale-110"
//       />

//       <div className="mt-3 flex-grow flex flex-col justify-between">
//         <div>
//           <span>{item._id}</span>
//           <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded ml-2">
//             {item.category || "General"}
//           </span>
//           <h2 className="mt-1 text-sm font-semibold text-gray-800 truncate">
//             {item.name}
//           </h2>
//           <div className="mt-1 flex items-center gap-2">
//             <span className="text-base font-bold text-gray-900">
//               ₹{discountedPrice}
//             </span>
//             {item.discount && (
//               <span className="text-xs text-gray-400 line-through">
//                 ₹{item.price}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center mt-1 text-yellow-400">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <Star key={i} size={14} fill="currentColor" stroke="none" />
//             ))}
//             <StarHalf size={14} fill="currentColor" stroke="none" />
//           </div>
//         </div>

//         <div className="mt-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleQuantityChange(item.id, -1);
//               }}
//               className="p-1 border rounded hover:bg-gray-100"
//             >
//               <Minus size={14} />
//             </button>
//             <span className="text-sm font-semibold">{quantity}</span>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleQuantityChange(item.id, 1);
//               }}
//               className="p-1 border rounded hover:bg-gray-100"
//             >
//               <Plus size={14} />
//             </button>
//           </div>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               addToCart(item.id, quantity);
//             }}
//             disabled={isAddingToCart[item.id]}
//             aria-label={`Add ${item.name} to cart`}
//             className={`flex items-center gap-2 bg-red-500 text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-red-600 transition-transform duration-200 hover:scale-105 ${isAddingToCart[item.id] ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {isAddingToCart[item.id] ? (
//               <span className="animate-spin">⏳</span>
//             ) : (
//               <>
//                 <FaShoppingCart size={16} />
//                 Add to Cart
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductListing = ({
//   products = [],
//   onDelete = () => {},
//   onAddProduct = () => {},
//   isLoading = false,
//   isError = false,
// }) => {
//   // Debug: Check products prop and loading state
//   console.log("Products received:", products, "Is Loading:", isLoading, "Is Error:", isError);

//   const [search, setSearch] = useState("");
//   const [quantities, setQuantities] = useState({});
//   const [wishlist, setWishlist] = useState({});
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isAddingToCart, setIsAddingToCart] = useState({});
//   const [isTogglingWishlist, setIsTogglingWishlist] = useState({});
//   const [sortOption, setSortOption] = useState("default");
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const token = localStorage.getItem("token");
//   const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

//   const debouncedSetSearch = useCallback(
//     debounce((value) => {
//       setSearch(value);
//       setCurrentPage(1);
//     }, 300),
//     []
//   );

//   const handleQuantityChange = (id, delta) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max((prev[id] || 1) + delta, 1),
//     }));
//   };

//   const toggleWishlist = async (e, productId) => {
//     e.stopPropagation();
//     setIsTogglingWishlist((prev) => ({ ...prev, [productId]: true }));
//     const isWished = wishlist[productId];

//     try {
//       const url = `${BASE_URL}/wishlist/${isWished ? "remove" : "add"}`;
//       await axios.post(
//         url,
//         { productId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setWishlist((prev) => ({
//         ...prev,
//         [productId]: !isWished,
//       }));

//       toast.success(
//         isWished ? "Removed from wishlist" : "Added to wishlist",
//         { position: "bottom-right" }
//       );
//     } catch (error) {
//       console.error("Wishlist API error:", error);
//       toast.error("Wishlist update failed", { position: "bottom-right" });
//     } finally {
//       setIsTogglingWishlist((prev) => ({ ...prev, [productId]: false }));
//     }
//   };

//   const addToCart = async (productId, quantity) => {
//     setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/cart/add`,
//         { productId, quantity },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.success("🛒 Added to cart!", { position: "bottom-right" });
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       toast.error("Failed to add to cart", { position: "bottom-right" });
//     } finally {
//       setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
//     }
//   };

//   // Get unique categories from products
//   const categories = useMemo(() => {
//     const uniqueCategories = [
//       ...new Set(products.map((item) => item.category || "General")),
//     ];
//     return uniqueCategories;
//   }, [products]);

//   // Filter and sort products
//   const filteredProducts = useMemo(() => {
//     console.log("Filtering products with search:", search, "and categories:", selectedCategories);
//     let filtered = products.filter((item) => {
//       const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(item.category || "General");
//       return matchesSearch && matchesCategory;
//     });

//     // Sort products
//     if (sortOption === "price-low-high") {
//       filtered.sort(
//         (a, b) =>
//           a.price * (1 - (a.discount || 0) / 100) -
//           b.price * (1 - (b.discount || 0) / 100)
//       );
//     } else if (sortOption === "price-high-low") {
//       filtered.sort(
//         (a, b) =>
//           b.price * (1 - (b.discount || 0) / 100) -
//           a.price * (1 - (a.discount || 0) / 100)
//       );
//     }

//     return filtered;
//   }, [products, search, sortOption, selectedCategories]);

//   const itemsPerPage = 12;
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const currentItems = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//     setCurrentPage(1);
//   };

//   // Skeleton Loader Component
//   const SkeletonCard = () => (
//     <div className="relative bg-white shadow-md rounded-xl p-4 flex flex-col animate-pulse">
//       <div className="w-full h-36 bg-gray-200 rounded-md"></div>
//       <div className="mt-3 flex-grow flex flex-col justify-between">
//         <div>
//           <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
//           <div className="flex items-center mt-2 gap-1">
//             <div className="h-4 bg-gray-200 rounded w-16"></div>
//             <div className="h-4 bg-gray-200 rounded w-12"></div>
//           </div>
//         </div>
//         <div className="mt-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="h-6 w-6 bg-gray-200 rounded"></div>
//             <div className="h-6 w-8 bg-gray-200 rounded"></div>
//             <div className="h-6 w-6 bg-gray-200 rounded"></div>
//           </div>
//           <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
//         </div>
//       </div>
//     </div>
//   );

//   if (isError) {
//     return (
//       <p className="text-center text-red-500 py-5">Failed to load products</p>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="px-4 py-6 relative">
//         <ToastContainer />
//         <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
//           <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
//           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//             <div className="h-10 w-full sm:w-[300px] bg-gray-200 rounded-lg animate-pulse"></div>
//             <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
//           </div>
//         </div>
//         <div className="mb-6 flex flex-wrap gap-2">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
//           ))}
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!filteredProducts.length) {
//     return (
//       <p className="text-center text-lg text-gray-600 mt-10">
//         No products found
//       </p>
//     );
//   }

//   return (
//     <div className="px-4 py-6 relative">
//       <ToastContainer />

//       <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
//         <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
//         <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//           <AtmSearchField
//             name="search"
//             value={search}
//             onChange={(e) => debouncedSetSearch(e.target.value)}
//             placeholder="Search products..."
//             className="w-full sm:w-[300px]"
//           />
//           <select
//             value={sortOption}
//             onChange={(e) => {
//               setSortOption(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="border rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="default">Sort: Default</option>
//             <option value="price-low-high">Price: Low to High</option>
//             <option value="price-high-low">Price: High to Low</option>
//           </select>
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div className="mb-6 flex flex-wrap gap-2">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => handleCategoryChange(category)}
//             className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
//               selectedCategories.includes(category)
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {currentItems.map((item) => (
//           <ProductCard
//             key={item.id}
//             item={item}
//             quantities={quantities}
//             wishlist={wishlist}
//             handleQuantityChange={handleQuantityChange}
//             toggleWishlist={toggleWishlist}
//             addToCart={addToCart}
//             setSelectedProduct={setSelectedProduct}
//             isAddingToCart={isAddingToCart}
//             isTogglingWishlist={isTogglingWishlist}
//           />
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-8">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="font-medium">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {selectedProduct && (
//         <ProductDetailsDrawer
//           open={!!selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           product={selectedProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductListing;

///////////////////////////////////////////////////////////
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

const ProductCard = ({
  item,
  quantities,
  wishlist,
  handleQuantityChange,
  toggleWishlist,
  addToCart,
  setSelectedProduct,
  isAddingToCart,
  isTogglingWishlist,
}) => {
  const quantity = quantities[item.id] || 1;
  const discountedPrice = (
    item.price *
    (1 - (item.discount || 0) / 100)
  ).toFixed(2);
  const discountPercent = item.discount || 0;

  return (
    <div
      className="relative bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 flex flex-col cursor-pointer group"
      onClick={() => setSelectedProduct(item)}
    >
      {item.discount && (
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-md rounded-tr-md z-10 animate-pulse">
          {discountPercent}% OFF
        </span>
      )}

      <button
        className={`absolute top-2 right-2 bg-white p-1 rounded-full z-10 hover:bg-red-100 ${
          isTogglingWishlist[item.id] ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={(e) => toggleWishlist(e, item.id)}
        disabled={isTogglingWishlist[item.id]}
        aria-label={
          wishlist[item.id]
            ? `Remove ${item.name} from wishlist`
            : `Add ${item.name} to wishlist`
        }
      >
        {wishlist[item.id] ? (
          <Heart className="text-red-500 fill-red-500" size={18} />
        ) : (
          <Heart className="text-gray-400" size={18} />
        )}
      </button>

      <img
        src={item.image || "/default-image.png"}
        alt={`Image of ${item.name}`}
        loading="lazy"
        className="w-full h-36 object-cover bg-gray-50 rounded-md transition-transform duration-300 group-hover:scale-110"
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
            disabled={isAddingToCart[item.id]}
            aria-label={`Add ${item.name} to cart`}
            className={`flex items-center gap-2 bg-red-500 text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-red-600 transition-transform duration-200 hover:scale-105 ${
              isAddingToCart[item.id] ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddingToCart[item.id] ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <>
                <FaShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

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
