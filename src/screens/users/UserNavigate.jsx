import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const UserNavigate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:3300/auth/google";
  };

  // React.useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   if (params.get("error")) {
  //     alert("Google login failed. Please try again.");
  //   }
  // }, []);
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const emailFromGoogle = params.get("email");

  if (params.get("error")) {
    alert("Google login failed. Please try again.");
  }

  if (emailFromGoogle) {
    navigate("/register", { state: { email: emailFromGoogle } });
  }
}, []);
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🔲 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105"
        style={{
          backgroundImage: `url("/images/For_Otp_Back.jpg")`,
        }}
      />

      {/* 🔳 Overlay to dim background slightly (optional) */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      {/* 🔘 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 bg-white p-8 rounded-xl shadow-md max-w-sm w-full space-y-4 text-center"
      >
        {/* Logo */}
        <img
          src="/images/vidhya-sta.png"
          alt="Logo"
          className="w-12 h-12 mx-auto mb-2"
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Sign in to your account
        </h2>
        <p className="text-sm text-gray-500">Choose a login method</p>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
          aria-label="Continue with Google"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span>{loading ? "Redirecting..." : "Continue with Google"}</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email Login */}
        <Link
          to="/otp"
          className="w-full block text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition font-medium"
        >
          Login with Mobile
        </Link>

        {/* Already registered */}
        <p className="text-sm text-gray-500 pt-2">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default UserNavigate;
