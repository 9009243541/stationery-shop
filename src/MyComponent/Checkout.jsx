import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://tbtdj99v-3300.inc1.devtunnels.ms";

const Checkout = () => {
  const [formData, setFormData] = useState({
    deliveryAddress: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: "",
  });

  const [orderSummary, setOrderSummary] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get cart/order data for summary (mock or from localStorage)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setOrderSummary(storedCart);

    const total = storedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        deliveryAddress: formData.deliveryAddress,
        phone: formData.phone,
        email: formData.email,
        location: {
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
      };

      const token = localStorage.getItem("token"); // Optional: if you use auth

      const res = await axios.post(`${BASE_URL}/order/place-order`, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      setMessage("✅ Order placed successfully!");
      localStorage.removeItem("cartItems");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2>Checkout</h2>

      <div>
        <h3>Order Summary</h3>
        {orderSummary.length > 0 ? (
          <ul>
            {orderSummary.map((item, index) => (
              <li key={index}>
                {item.name} × {item.quantity} - ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in cart.</p>
        )}
        <strong>Total: ₹{totalAmount}</strong>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Shipping Info</h3>

        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
        />

        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          style={{ width: "49%", marginRight: "2%", padding: "8px" }}
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          style={{ width: "49%", padding: "8px" }}
        />

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          style={{
            marginTop: "1rem",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </div>
    </div>
  );
};

export default Checkout;
