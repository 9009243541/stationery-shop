import React from "react";
import AtmTextField from "../../../component/atom/AtmTextField";
import AtmNumberField from "../../../component/atom/AtmNumberField";
import AtmPasswordField from "../../../component/atom/AtmPasswordField";
import AtmButtonField from "../../../component/atom/AtmButtonField";
import AtmTextAreaField from "../../../component/atom/AtmTextAreaFiels";
import { Link } from "react-router-dom";

const UserRegister = ({ formikProps }) => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = formikProps;
  const buttonClasses = `w-full p-3 text-white rounded-md shadow-lg transition-all duration-300 cursor-pointer`;
  const handleFileChange = (event) => {
    const file = event.currentTarget.files?.[0] || null;
    console.log("Selected File:", file);
    if (file) {
      formikProps.setFieldValue("image", file);
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* Background image with slight blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/t.jpg"
          alt="Background"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      {/* Form wrapper with glassmorphism effect */}
      <div className="relative z-10 w-full max-w-2xl p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700  mb-6">
          User Registration
        </h1>

        {/* Keep your form fields here */}

        <div className="space-y-4">
          {/* First Name & Last Name in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AtmTextField
                label="First Name"
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                onBlur={handleBlur}
                className="w-full"
              />
              {errors.firstName && touched.firstName && (
                <div className="text-red-500 text-sm">{errors.firstName}</div>
              )}
            </div>

            <div>
              <AtmTextField
                label="Last Name"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                onBlur={handleBlur}
                className="w-full"
              />
              {errors.lastName && touched.lastName && (
                <div className="text-red-500 text-sm">{errors.lastName}</div>
              )}
            </div>
          </div>

          {/* Age & Mobile in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AtmNumberField
                label="Age"
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                placeholder="Enter your age"
                onBlur={handleBlur}
                className="w-full"
              />
              {errors.age && touched.age && (
                <div className="text-red-500 text-sm">{errors.age}</div>
              )}
            </div>

            <div>
              <AtmTextField
                label="Mobile"
                type="text"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                onBlur={handleBlur}
                className="w-full"
              />
              {errors.mobile && touched.mobile && (
                <div className="text-red-500 text-sm">{errors.mobile}</div>
              )}
            </div>
          </div>

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
              className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled={true}
            />
          </div>

          {/* Address */}
          <div>
            <AtmTextAreaField
              label="Address"
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Enter your address"
              onBlur={handleBlur}
              className="w-full"
            />
            {errors.address && touched.address && (
              <div className="text-red-500 text-sm">{errors.address}</div>
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
          {/* image */}
          <div className="mt-1 flex items-center gap-4">
            {/* Custom File Upload Button */}
            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* ✅ Show Preview if Image is Selected */}
            {formikProps.values.image && (
              <img
                src={URL.createObjectURL(formikProps.values.image)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Submit Button */}
          <div>
            <AtmButtonField
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? "Submitting..." : "Register"}
              className={`${buttonClasses} ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105"
              }`}
            />
          </div>
        </div>
        {/* Already have an account? */}
        <p className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-500 font-semibold hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
