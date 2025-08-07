
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom"; // 🔁 Import

// const BASE_URL = "https://tbtdj99v-3300.inc1.devtunnels.ms";

// const Checkout = () => {
//   const navigate = useNavigate(); // 🔁 Hook
//   const [formData, setFormData] = useState({
//     deliveryAddress: "",
//     phone: "",
//     email: "",
//     latitude: "",
//     longitude: "",
//   });

//   const [orderSummary, setOrderSummary] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${BASE_URL}/cart/get`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const products = res.data?.data?.products || [];

//         setOrderSummary(products);

//         const total = products.reduce(
//           (acc, item) => acc + item.product.rate * item.quantity,
//           0
//         );
//         setTotalAmount(total);
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//         toast.error("Failed to fetch cart");
//       }
//     };

//     fetchCart();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePlaceOrder = async () => {
//     setLoading(true);

//     try {
//       const payload = {
//         deliveryAddress: formData.deliveryAddress,
//         phone: formData.phone,
//         email: formData.email,
//         location: {
//           latitude: formData.latitude,
//           longitude: formData.longitude,
//         },
//       };

//       const token = localStorage.getItem("token");

//       const res = await axios.post(`${BASE_URL}/order/place-order`, payload, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       });

//       toast.success("✅ Order placed successfully!");

//       // Wait for toast and redirect
//       setTimeout(() => {
//         navigate("/thank-you"); // 🔁 Redirect
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
//       <ToastContainer />
//       <h2>Checkout</h2>

//       <div>
//         <h3>Order Summary</h3>
//         {orderSummary.length > 0 ? (
//           <ul>
//             {orderSummary.map((item, index) => (
//               <li key={index}>
//                 {item.product?.name} × {item.quantity} - ₹
//                 {item.product?.rate * item.quantity}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No items in cart.</p>
//         )}
//         <strong>Total: ₹{totalAmount}</strong>
//       </div>

//       <div style={{ marginTop: "2rem" }}>
//         <h3>Shipping Info</h3>

//         <input
//           type="text"
//           name="deliveryAddress"
//           placeholder="Delivery Address"
//           value={formData.deliveryAddress}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
//         />

//         <div style={{ display: "flex", gap: "2%" }}>
//           <input
//             type="text"
//             name="latitude"
//             placeholder="Latitude"
//             value={formData.latitude}
//             onChange={handleChange}
//             style={{ width: "49%", padding: "8px" }}
//           />
//           <input
//             type="text"
//             name="longitude"
//             placeholder="Longitude"
//             value={formData.longitude}
//             onChange={handleChange}
//             style={{ width: "49%", padding: "8px" }}
//           />
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           style={{
//             marginTop: "1rem",
//             padding: "10px 20px",
//             backgroundColor: "#28a745",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             width: "100%",
//           }}
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
// Checkout.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({
  formData,
  orderSummary,
  totalAmount,
  loading,
  handleChange,
  handlePlaceOrder,
}) => {
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <ToastContainer />
      <h2>Checkout</h2>

      <div>
        <h3>Order Summary</h3>
        {orderSummary.length > 0 ? (
          <ul>
            {orderSummary.map((item, index) => (
              <li key={index}>
                {item.product?.name} × {item.quantity} - ₹
                {item.product?.rate * item.quantity}
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

        <div style={{ display: "flex", gap: "2%" }}>
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            style={{ width: "49%", padding: "8px" }}
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            style={{ width: "49%", padding: "8px" }}
          />
        </div>

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
            width: "100%",
          }}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
