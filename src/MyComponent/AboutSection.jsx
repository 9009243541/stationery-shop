import React, { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [formData, setFormData] = useState({
    deliveryAddress: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await axios.post(
        "https://tbtdj99v-3300.inc1.devtunnels.ms/order/place-order",
        {
          deliveryAddress: formData.deliveryAddress,
          phone: formData.phone,
          email: formData.email,
          location: {
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
        }
      );

      setResponseMessage("✅ Order placed successfully!");
    } catch (error) {
      setResponseMessage("❌ Failed to place order. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <form onSubmit={handlePlaceOrder} className="row g-3 justify-content-center">
        <div className="col-md-6">
          <label className="form-label">Delivery Address</label>
          <input
            type="text"
            name="deliveryAddress"
            className="form-control"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Latitude</label>
          <input
            type="text"
            name="latitude"
            className="form-control"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Longitude</label>
          <input
            type="text"
            name="longitude"
            className="form-control"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success px-4" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>

        {responseMessage && (
          <div className="col-12 text-center mt-3">
            <div className="alert alert-info">{responseMessage}</div>
          </div>
        )}
      </form>

      <div className="text-center mt-5">
        <h5>Support a Cause While You Order</h5>
        <a
          href="https://www.akshayapatra.org/g/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-warning mt-2"
        >
          Donate to Akshaya Patra 🍲
        </a>
      </div>
    </div>
  );
};

export default Checkout;
