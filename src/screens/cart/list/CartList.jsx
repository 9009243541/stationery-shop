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
                  <span className="text-black-500 text-xs font-bold bg-yellow-100 px-2 py-1 rounded">
                      {item.product?.discount > 0 ? ` ${item.product.discount}% off proposed by ` : ""}{item.product?.organizedBy || "Unknown"}
                  </span>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    ₹{totalItemPrice}
                  </p>
                  <p className="text-xs text-gray-500 line-through">
                    ₹{item.product?.mrp * item.quantity}
                  </p>
                </div>
                <button
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 mt-2 mr-2"
                  onClick={() => removeFromCart(item.product._id)}
                  style={{ alignSelf: "flex-end" }}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className="mt-8 text-right bg-white p-4 rounded-lg ">
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
