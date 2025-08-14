import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircleIcon, AlertCircleIcon } from "lucide-react";

const FreeCopyDistribution = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://stationery-shop-backend-y2lb.onrender.com/free-copy-distribution/register",
        formData
      );

      setSubmitted(true);

      // Check if message exists in backend response
      const message = res?.data?.message || "✅ Registration successful!";
      toast.success(message);

      setFormData({ name: "", contact: "", email: "" });
    } catch (err) {
      // Try to get error message from backend response
      const errorMessage =
        err?.response?.data?.message ||
        "❌ Failed to register. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <img
        src="/images/copy-distribution.jpg"
        alt="Free Copy Distribution"
        className="w-full h-96 object-cover mb-8"
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center text-yellow-800">
            📚 Free Copy Distribution Drive
          </h1>

          <p className="text-gray-700 text-lg mb-8 text-center">
            Every year, we distribute free notebooks and school supplies to
            students from underprivileged backgrounds. This initiative aims to
            support education and empower young minds with basic learning tools.
          </p>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
              🎓 Student Pre-Registration
            </h2>

            {submitted ? (
              <div className="text-green-700 flex items-center gap-2 font-medium text-lg">
                <CheckCircleIcon className="text-green-600" size={24} />
                Thank you for registering! We’ll contact you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Submitting..." : "Submit Registration"}
                </button>
              </form>
            )}
          </div>

          {/* Contribution Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 md:p-10 shadow-md">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-3">
              🤝 Want to Contribute?
            </h2>
            <p className="text-gray-700 mb-4">
              We welcome individuals and organizations who wish to support this
              cause. Whether you want to donate supplies or volunteer your time,
              we’d love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Contact Us to Contribute
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeCopyDistribution;
