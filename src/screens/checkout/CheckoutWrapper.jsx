import React, { useState, useEffect } from "react";
import axios from "axios";
import Checkout from "./Checkout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://stationery-shop-backend-y2lb.onrender.com";

const CheckoutWrapper = () => {
  const navigate = useNavigate();

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

  // 🛒 Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/cart/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const products = res.data?.data?.products || [];
        setOrderSummary(products);

        const total = products.reduce((acc, item) => {
          const discountedPrice =
            item.product?.mrp * (1 - (item.product?.discount || 0) / 100);
          return acc + discountedPrice * (item.quantity || 0);
        }, 0);

        setTotalAmount(total.toFixed(2));
      } catch (err) {
        console.error("Error fetching cart:", err);
        toast.error("Failed to fetch cart");
      }
    };

    fetchCart();
  }, []);

  // 📦 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧾 Place Order
  const handlePlaceOrder = async () => {
    if (!formData.latitude || !formData.longitude) {
      toast.error("Please select your location on the map or use current location");
      return;
    }

    if (!formData.deliveryAddress) {
      toast.error("Please provide a delivery address");
      return;
    }

    setLoading(true);
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

      const token = localStorage.getItem("token");

      await axios.post(`${BASE_URL}/order/place-order`, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      toast.success("✅ Order placed successfully!");
      setTimeout(() => navigate("/thank-you"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Checkout
      formData={formData}
      setFormData={setFormData}
      orderSummary={orderSummary}
      totalAmount={totalAmount}
      loading={loading}
      handleChange={handleChange}
      handlePlaceOrder={handlePlaceOrder}
    />
  );
};

export default CheckoutWrapper;