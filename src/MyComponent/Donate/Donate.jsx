import React, { useState } from "react";
import { Heart } from "lucide-react";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = (e) => {
    e.preventDefault();
    const finalAmount = amount || customAmount;
    if (!finalAmount) {
      alert("Please select or enter an amount.");
      return;
    }
    // 👇 Here you can integrate Razorpay, Stripe, or PayPal
    alert(`Thank you for donating ₹${finalAmount}! ❤️`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Heart size={40} className="text-red-500 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">
            Support Our Mission
          </h1>
          <p className="text-gray-600 mt-2">
            Your contribution helps us bring education, food, and care to
            underprivileged communities.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleDonate} className="space-y-6">
          {/* Predefined Amounts */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Choose Amount:</p>
            <div className="grid grid-cols-3 gap-3">
              {["500", "1000", "5000"].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`border rounded-lg py-2 font-semibold transition ${
                    amount === amt
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Or Enter Custom Amount:
            </label>
            <input
              type="number"
              placeholder="Enter amount in ₹"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount("");
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Donate Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Donate Now
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          100% of your donation goes directly to our programs ❤️
        </p>
      </div>
    </div>
  );
};

export default Donate;
