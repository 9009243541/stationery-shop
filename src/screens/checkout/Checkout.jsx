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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Checkout</h2>

      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-700">
          Order Summary
        </h3>
        {orderSummary.length > 0 ? (
          <ul className="space-y-2 mb-4 text-gray-600">
            {orderSummary.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <span className="font-medium text-gray-800">
                  {item.product?.name}
                </span>{" "}
                × {item.quantity} — ₹{item.product?.rate * item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No items in cart.</p>
        )}
        <div className="text-right font-bold text-gray-800 mb-6">
          Total: ₹{totalAmount}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-gray-700">
          Shipping Info
        </h3>

        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full p-3 rounded-md text-white font-medium transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
