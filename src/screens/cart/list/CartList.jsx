import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://tbtdj99v-3300.inc1.devtunnels.ms';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data?.data?.products || []);
    } catch (error) {
      console.error('Error fetching cart:', error.response?.data || error.message);
      toast.error('❌ Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${BASE_URL}/cart/remove`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
      toast.success('🗑️ Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error.response?.data || error.message);
      toast.error('❌ Failed to remove item from cart');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading cart...</p>;
  if (cartItems.length === 0) return <p className="text-center text-gray-400 mt-6">Your cart is empty.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <ToastContainer />
      <h3 className="text-2xl font-semibold mb-6">🛒 Your Cart</h3>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-md flex flex-col md:flex-row justify-between items-center p-4"
          >
            <div className="flex-1">
              <h5 className="text-lg font-medium">{item.product?.productName}</h5>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-600 mb-2">Price: ₹{item.product?.rate}</p>
              <button
                className="text-white bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded"
                onClick={() => removeFromCart(item.product._id)}
              >
                Remove
              </button>
            </div>

            {item.product?.image && (
              <img
                src={`${BASE_URL}/uploads/${item.product.image.replace(/\\/g, '/')}`}
                alt={item.product.productName}
                className="w-24 h-24 object-cover rounded mt-4 md:mt-0 md:ml-4"
              />
            )}
          </div>
        ))}
      </div>

      {/* ✅ Proceed to Checkout Button */}
      <div className="mt-8 text-right">
        <button
          onClick={() => navigate('/discounted-stationery/checkout')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartList;
