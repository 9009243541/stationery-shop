import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    // Fetch cart items
    const fetchCart = async () => {
      try {
        const res = await axios.get('/api/cart'); // Update with your backend API
        setCartItems(res.data);
        const totalPrice = res.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalPrice);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    fetchCart();
  }, []);

  const placeOrder = async () => {
    if (!address || !phone) {
      alert('Please fill in address and phone');
      return;
    }

    setPlacingOrder(true);
    try {
      const res = await axios.post('/api/order', {
        address,
        phone,
        items: cartItems,
        total
      });

      if (res.data.success) {
        alert('Order placed successfully!');
        setCartItems([]);
        setAddress('');
        setPhone('');
        setTotal(0);
      } else {
        alert('Failed to place order.');
      }
    } catch (err) {
      console.error('Order error:', err);
      alert('Something went wrong.');
    }
    setPlacingOrder(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Delivery Address</label>
        <textarea
          rows="3"
          className="w-full border px-3 py-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Phone Number</label>
        <input
          type="tel"
          className="w-full border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Order Summary</h3>
      <div className="bg-gray-50 p-4 rounded border mb-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))
        )}
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <p>Total:</p>
          <p>₹{total}</p>
        </div>
      </div>

      <button
        onClick={placeOrder}
        disabled={placingOrder || cartItems.length === 0}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
      >
        {placingOrder ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout;
