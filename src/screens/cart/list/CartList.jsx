// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5000';

// const CartList = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchCartItems = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/cart/get`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCartItems(response.data?.data?.products || []);
//     } catch (error) {
//       console.error('Error fetching cart:', error.response?.data || error.message);
//       toast.error('❌ Failed to fetch cart items');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         `${BASE_URL}/cart/remove`,
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
//       toast.success('🗑️ Item removed from cart');
//     } catch (error) {
//       console.error('Error removing item:', error.response?.data || error.message);
//       toast.error('❌ Failed to remove item from cart');
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   // Calculate discounted price for an item
//   const calculateDiscountedPrice = (mrp, discount) => {
//     return mrp * (1 - discount / 100);
//   };

//   // Calculate total price for the cart
//   const calculateCartTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const priceAfterDiscount = calculateDiscountedPrice(item.product.mrp, item.product.discount);
//       return total + priceAfterDiscount * item.quantity;
//     }, 0).toFixed(2);
//   };

//   if (loading) return <p className="text-center text-gray-500 mt-6">Loading cart...</p>;
//   if (cartItems.length === 0) return <p className="text-center text-gray-400 mt-6">Your cart is empty.</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <ToastContainer />
//       <h3 className="text-2xl font-semibold mb-6">🛒 Shopping Cart</h3>

//       <div className="space-y-4">
//         {cartItems.map((item) => {
//           const discountedPrice = calculateDiscountedPrice(item.product.mrp, item.product.discount).toFixed(2);
//           const totalItemPrice = (discountedPrice * item.quantity).toFixed(2);

//           return (
//             <div
//               key={item._id}
//               className="bg-white shadow rounded-md flex flex-col md:flex-row justify-between items-center p-4"
//             >
//               <div className="flex-1">
//                 <h5 className="text-lg font-medium">{item.product?.productName}</h5>
//                 <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//                 <p className="text-sm text-gray-600">
//                   Original Price: ₹{item.product?.mrp}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Discount: {item.product?.discount}%
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Price after Discount: ₹{discountedPrice}
//                 </p>
//                 <p className="text-sm font-semibold text-gray-800">
//                   Total: ₹{totalItemPrice}
//                 </p>
//                 <button
//                   className="text-white bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded mt-2"
//                   onClick={() => removeFromCart(item.product._id)}
//                 >
//                   Remove
//                 </button>
//               </div>

//               {item.product?.image && (
//                 <img
//                   src={`${BASE_URL}/Uploads/${item.product.image.replace(/\\/g, '/')}`}
//                   alt={item.product.productName}
//                   className="w-24 h-24 object-cover rounded mt-4 md:mt-0 md:ml-4"
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Cart Total */}
//       <div className="mt-8 text-right">
//         <p className="text-lg font-semibold">
//           Cart Total: ₹{calculateCartTotal()}
//         </p>
//         <button
//           onClick={() => navigate('/discounted-stationery/checkout')}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition mt-4"
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartList;

////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { Minus, Plus, Trash2 } from "lucide-react";

// const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000";

// const CartList = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchCartItems = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${BASE_URL}/cart/get`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(response.data?.data?.products || []);
//     } catch (error) {
//       console.error(
//         "Error fetching cart:",
//         error.response?.data || error.message
//       );
//       toast.error("❌ Failed to fetch cart items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         `${BASE_URL}/cart/remove`,
//         { productId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCartItems((prev) =>
//         prev.filter((item) => item.product._id !== productId)
//       );
//       toast.success("🗑️ Item removed from cart");
//     } catch (error) {
//       console.error(
//         "Error removing item:",
//         error.response?.data || error.message
//       );
//       toast.error("❌ Failed to remove item from cart");
//     }
//   };

//   const updateQuantity = (productId, newQty) => {
//     if (newQty < 1) return;
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.product._id === productId ? { ...item, quantity: newQty } : item
//       )
//     );
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const calculateDiscountedPrice = (mrp, discount) =>
//     mrp * (1 - discount / 100);

//   const calculateCartTotal = () =>
//     cartItems
//       .reduce((total, item) => {
//         const priceAfterDiscount = calculateDiscountedPrice(
//           item.product.mrp,
//           item.product.discount
//         );
//         return total + priceAfterDiscount * item.quantity;
//       }, 0)
//       .toFixed(2);

//   if (loading)
//     return <p className="text-center text-gray-500 mt-6">Loading cart...</p>;
//   if (cartItems.length === 0)
//     return (
//       <p className="text-center text-gray-400 mt-6">Your cart is empty.</p>
//     );

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6">
//       <ToastContainer />
//       <h3 className="text-3xl font-bold mb-8 text-gray-800">🛒 Your Cart</h3>

//       <div className="space-y-5">
//         {cartItems.map((item) => {
//           const discountedPrice = calculateDiscountedPrice(
//             item.product.mrp,
//             item.product.discount
//           ).toFixed(2);
//           const totalItemPrice = (discountedPrice * item.quantity).toFixed(2);

//           return (
//             <div
//               key={item._id}
//               className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center p-4"
//             >
//               {/* Image */}
//               {item.product?.image && (
//                 <img
//                   src={`${BASE_URL}/Uploads/${item.product.image.replace(
//                     /\\/g,
//                     "/"
//                   )}`}
//                   alt={item.product.productName}
//                   className="w-28 h-28 object-cover rounded-lg border"
//                 />
//               )}

//               {/* Details */}
//               <div className="flex flex-col md:flex-row justify-between items-center w-full ml-4">
//                 <div className="flex-1">
//                   <h5 className="text-lg font-semibold text-gray-800">
//                     {item.product?.productName}
//                   </h5>
//                   <p className="text-sm text-gray-500">
//                     MRP: ₹{item.product?.mrp} | Discount:{" "}
//                     {item.product?.discount}%
//                   </p>
//                   <p className="text-sm text-green-600 font-medium">
//                     Price after Discount: ₹{discountedPrice}
//                   </p>

//                   {/* Quantity Controls */}
//                   <div className="flex items-center mt-3">
//                     <button
//                       className="p-1 bg-gray-200 hover:bg-gray-300 rounded-l"
//                       onClick={() =>
//                         updateQuantity(item.product._id, item.quantity - 1)
//                       }
//                     >
//                       <Minus size={16} />
//                     </button>
//                     <span className="px-4 py-1 border">{item.quantity}</span>
//                     <button
//                       className="p-1 bg-gray-200 hover:bg-gray-300 rounded-r"
//                       onClick={() =>
//                         updateQuantity(item.product._id, item.quantity + 1)
//                       }
//                     >
//                       <Plus size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Price & Remove */}
//                 <div className="text-right mt-4 md:mt-0">
//                   <p className="text-lg font-bold text-gray-800">
//                     ₹{totalItemPrice}
//                   </p>
//                   <button
//                     className="flex items-center gap-1 text-red-500 hover:text-red-600 mt-2"
//                     onClick={() => removeFromCart(item.product._id)}
//                   >
//                     <Trash2 size={16} /> Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Cart Total */}
//       <div className="mt-8 text-right bg-white p-4 rounded-xl shadow-md">
//         <p className="text-xl font-bold text-gray-800">
//           Cart Total: ₹{calculateCartTotal()}
//         </p>
//         <button
//           onClick={() => navigate("/discounted-stationery/checkout")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition mt-4"
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartList;
//////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data?.data?.products || []);
    } catch (error) {
      toast.error("❌ Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/cart/remove`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
      toast.success("🗑️ Item removed from cart");
    } catch {
      toast.error("❌ Failed to remove item from cart");
    }
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateDiscountedPrice = (mrp, discount) =>
    mrp * (1 - discount / 100);

  const calculateCartTotal = () =>
    cartItems
      .reduce((total, item) => {
        const priceAfterDiscount = calculateDiscountedPrice(
          item.product.mrp,
          item.product.discount
        );
        return total + priceAfterDiscount * item.quantity;
      }, 0)
      .toFixed(2);

  if (loading)
    return <p className="text-center text-gray-500 mt-6">Loading cart...</p>;
  if (cartItems.length === 0)
    return (
      <p className="text-center text-gray-400 mt-6">Your cart is empty.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <ToastContainer />
      <h3 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h3>

      <div className="space-y-5">
        {cartItems.map((item) => {
          const discountedPrice = calculateDiscountedPrice(
            item.product.mrp,
            item.product.discount
          ).toFixed(2);
          const totalItemPrice = (discountedPrice * item.quantity).toFixed(2);

          return (
            <div
              key={item._id}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition flex flex-col md:flex-row p-4"
            >
              {/* Product Image */}
              {item.product?.image && (
                <img
                  src={`${BASE_URL}/Uploads/${item.product.image.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={item.product.productName}
                  className="w-28 h-28 object-cover rounded-md border"
                />
              )}

              {/* Product Details */}
              <div className="flex flex-col flex-1 md:ml-4 mt-3 md:mt-0">
                <h5 className="text-lg font-semibold text-gray-800">
                  {item.product?.productTitle || item.product?.productName}
                </h5>
                <p className="text-sm text-gray-500">
                  Brand: {item.product?.brand}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  MRP: ₹{item.product?.mrp} | Discount: {item.product?.discount}
                  %
                </p>
                <p className="text-sm font-medium text-green-600">
                  Price after discount: ₹{discountedPrice}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-3">
                  <button
                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded-l"
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity - 1)
                    }
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-1 border">{item.quantity}</span>
                  <button
                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded-r"
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="flex flex-col justify-between text-right mt-4 md:mt-0 md:ml-6">
                <div>
                  <span className="text-red-500 text-xs font-bold bg-red-100 px-2 py-1 rounded">
                    Limited time deal
                  </span>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    ₹{totalItemPrice}
                  </p>
                  <p className="text-xs text-gray-500 line-through">
                    ₹{item.product?.mrp * item.quantity}
                  </p>
                </div>
                <button
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 mt-2"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className="mt-8 text-right bg-white p-4 rounded-lg border shadow-sm">
        <p className="text-xl font-bold text-gray-800">
          Subtotal ({cartItems.length} items): ₹{calculateCartTotal()}
        </p>
        <button
          onClick={() => navigate("/discounted-stationery/checkout")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg text-sm font-medium transition mt-4"
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default CartList;
