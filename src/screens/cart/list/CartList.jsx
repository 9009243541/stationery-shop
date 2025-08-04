import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://tbtdj99v-3300.inc1.devtunnels.ms';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

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

  const placeOrder = async () => {
    try {
      setPlacingOrder(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `${BASE_URL}/order/place`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems([]);
      toast.success('✅ Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      toast.error('❌ Failed to place order');
    } finally {
      setPlacingOrder(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3>Your Cart</h3>

      {cartItems.map((item) => (
        <div key={item._id} className="card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title">{item.product?.productName}</h5>
              <p className="card-text">Quantity: {item.quantity}</p>
              <p className="card-text">Price: ₹{item.product?.rate}</p>
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => removeFromCart(item.product._id)}
              >
                Remove
              </button>
            </div>
            {item.product?.image && (
              <img
                src={`${BASE_URL}/uploads/${item.product.image}`}
                alt={item.product.productName}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
      ))}

      <button
        className="btn btn-success mt-3"
        onClick={placeOrder}
        disabled={placingOrder}
      >
        {placingOrder ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CartList;
