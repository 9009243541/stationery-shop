import React from "react";
import { useNavigate } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 mx-auto mb-4">
          <IconCheck size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-6">
          We've received your order and will start processing it soon. You’ll
          receive a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate("/discounted-stationery/product")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
