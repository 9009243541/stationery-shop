import React, { useState } from "react";
import axios from "axios";
import image01 from "../../public/images/copy-distribution.jpg"; // Adjust the path as necessary

const FreeCopyDistribution = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      await axios.post("https://your-api.com/api/copy-drive/register", formData);
      setSubmitted(true);
      setFormData({ name: "", contact: "", email: "" });
    } catch (err) {
      setError("Failed to register. Try again.");
    }
  };

  return (
    <div>
         <img
            src={image01}
            alt="Free Copy Distribution"
            className="w-full h-100 mb-10 object-cover"  />


          <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Event Title */}
        <h1 className="text-4xl font-bold mb-4 text-center text-yellow-800">📚 Free Copy Distribution Drive</h1>
       
        
        
        <p className="text-gray-700 text-lg mb-8 text-center">
          Every year, we distribute free notebooks and school supplies to students from underprivileged backgrounds. 
          This initiative aims to support education and empower young minds with basic learning tools.
        </p>

        {/* Section: Pre-registration Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4">🎓 Student Pre-Registration</h2>
          {submitted ? (
            <p className="text-green-600 font-semibold">Thank you for registering! We'll contact you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                required
                value={formData.contact}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Submit Registration
              </button>
            </form>
          )}
        </div>

        {/* Section: Contribution / Contact */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 md:p-10 shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-3">🤝 Want to Contribute?</h2>
          <p className="text-gray-700 mb-4">
            We welcome individuals and organizations who wish to support this cause. Whether you want to donate supplies or volunteer your time, we’d love to hear from you.
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
