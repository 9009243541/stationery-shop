import React from "react";
import AtmTextField from "../../../component/atom/AtmTextField";
import AtmPasswordField from "../../../component/atom/AtmPasswordField";
import AtmButtonField from "../../../component/atom/AtmButtonField";
import { Link } from "react-router-dom";

const UserLogin = ({ formikProps }) => {
  const { values, handleChange, handleBlur, errors, touched, isSubmitting } =
    formikProps;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/t.jpg"
          alt="Background"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
      </div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-2xl p-6 sm:p-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl">
        {/* Logo + Heading */}
        <div className="flex items-center mb-6 sm:mb-8 gap-4">
          <img
            src="/images/aa.png"
            alt="Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
              AV Foundation
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm">
              Welcome back! Please login to your account
            </p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 drop-shadow-md">
          Login to your account
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {/* Email */}
          <div>
            <AtmTextField
              label="Email"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              onBlur={handleBlur}
              className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
            />
            <div className="text-red-400 text-sm mt-1 min-h-[20px]">
              {errors.email && touched.email && errors.email}
            </div>
          </div>

          {/* Password */}
          <div>
            <AtmPasswordField
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              onBlur={handleBlur}
              className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
            />
            <div className="text-red-400 text-sm mt-1 min-h-[20px]">
              {errors.password && touched.password && errors.password}
            </div>
          </div>

          {/* Submit Button */}
          <AtmButtonField
            type="submit"
            disabled={isSubmitting}
            label={
              isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </div>
              ) : (
                "Login"
              )
            }
            className={`w-full p-3 rounded-lg text-white font-bold shadow-lg transition transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105"
            }`}
          />

          {/* Register link */}
          <p className="text-center text-xs sm:text-sm text-gray-200 mt-3 sm:mt-4">
            Don’t have an account?{" "}
            <Link
              to="/user"
              className="text-sky-400 font-semibold hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

