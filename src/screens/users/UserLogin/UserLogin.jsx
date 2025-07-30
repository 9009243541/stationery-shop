import React from "react";
import AtmTextField from "../../../component/atom/AtmTextField";
import AtmPasswordField from "../../../component/atom/AtmPasswordField";
import AtmButtonField from "../../../component/atom/AtmButtonField";
import { Link } from "react-router-dom";

const UserLogin = ({ formikProps }) => {
  const { values, handleChange, handleBlur, errors, touched, isSubmitting } =
    formikProps;

  const buttonClasses = `w-full p-3 text-white rounded-md shadow-lg transition-all duration-300 cursor-pointer`;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
      {/* Blurred Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75"
        style={{
          backgroundImage: "url('/images/t.jpg')",
          zIndex: -1,
        }}
      ></div>

      {/* Content Layer */}
      <div className="p-8 rounded-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          User Login
        </h1>

        <div className="space-y-4">
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
              className="w-full"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
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
              className="w-full"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <AtmButtonField
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? "Logging in..." : "Login"}
              className={`w-full p-3 text-white rounded-md shadow-lg transition-all duration-300 cursor-pointer ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105"
              }`}
            />
          </div>
        </div>

        <p className="text-center text-sm text-white mt-4">
          Don't have an account?{" "}
          <Link
            to="/user"
            className="text-sky-300 font-semibold hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
