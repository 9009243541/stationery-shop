// import React from "react";
// import AtmTextField from "../../../component/atom/AtmTextField";
// import AtmNumberField from "../../../component/atom/AtmNumberField";
// import AtmPasswordField from "../../../component/atom/AtmPasswordField";
// import AtmButtonField from "../../../component/atom/AtmButtonField";
// import AtmTextAreaField from "../../../component/atom/AtmTextAreaFiels";
// import { Link } from "react-router-dom";

// const UserRegister = ({ formikProps }) => {
//   const {
//     values,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     errors,
//     touched,
//     isSubmitting,
//   } = formikProps;

//   const handleFileChange = (event) => {
//     const file = event.currentTarget.files?.[0] || null;
//     if (file) {
//       formikProps.setFieldValue("image", file);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
//       {/* Background image with blur */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/images/t.jpg"
//           alt="Background"
//           className="w-full h-full object-cover blur-sm"
//         />
//         <div className="absolute inset-0 bg-black/30"></div>
//       </div>

//       {/* Form container */}
//       <div className="relative z-10 w-full max-w-2xl p-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl">
//         {/* Logo + AV Foundation aligned left */}
//         <div className="flex items-center mb-8 gap-4">
//           <img
//             src="/images/aa.png"
//             alt="Logo"
//             className="w-20 h-20 object-contain"
//           />
//           <div>
//             <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
//               AV Foundation
//             </h1>
//             <p className="text-gray-200 text-sm">
//               Sign up to join our community
//             </p>
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">
//           Create a new account
//         </h2>

//         <div className="space-y-6">
//           {/* Name fields */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <AtmTextField
//                 label="First Name"
//                 type="text"
//                 name="firstName"
//                 value={values.firstName}
//                 onChange={handleChange}
//                 placeholder="John"
//                 onBlur={handleBlur}
//                 className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
//               />
//               {errors.firstName && touched.firstName && (
//                 <div className="text-red-400 text-sm mt-1">
//                   {errors.firstName}
//                 </div>
//               )}
//             </div>

//             <div>
//               <AtmTextField
//                 label="Last Name"
//                 type="text"
//                 name="lastName"
//                 value={values.lastName}
//                 onChange={handleChange}
//                 placeholder="Doe"
//                 onBlur={handleBlur}
//                 className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
//               />
//               {errors.lastName && touched.lastName && (
//                 <div className="text-red-400 text-sm mt-1">
//                   {errors.lastName}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Age & Mobile */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <AtmNumberField
//                 label="Age"
//                 type="number"
//                 name="age"
//                 value={values.age}
//                 onChange={handleChange}
//                 placeholder="25"
//                 onBlur={handleBlur}
//                 className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
//               />
//               {errors.age && touched.age && (
//                 <div className="text-red-400 text-sm mt-1">{errors.age}</div>
//               )}
//             </div>
//             <div>
//               <AtmTextField
//                 label="Mobile"
//                 type="text"
//                 name="mobile"
//                 value={values.mobile}
//                 onChange={handleChange}
//                 placeholder="Enter your Mobile Number"
//                 onBlur={handleBlur}
//                 className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
//               />
//               {errors.mobile && touched.mobile && (
//                 <div className="text-red-400 text-sm mt-1">{errors.mobile}</div>
//               )}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <AtmTextField
//               label="Email"
//               type="text"
//               name="email"
//               value={values.email}
//               onChange={handleChange}
//               placeholder="example@email.com"
//               onBlur={handleBlur}
//               disabled
//               className="w-full p-3 rounded-lg bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed"
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <AtmTextAreaField
//               label="Address"
//               type="text"
//               name="address"
//               value={values.address}
//               onChange={handleChange}
//               placeholder="Your Address"
//               onBlur={handleBlur}
//               className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
//             />
//             {errors.address && touched.address && (
//               <div className="text-red-400 text-sm mt-1">{errors.address}</div>
//             )}
//           </div>

//           {/* Password fields */}
//           <div>
//             <AtmPasswordField
//               label="Password"
//               type="password"
//               name="password"
//               value={values.password}
//               onChange={handleChange}
//               placeholder="Enter password"
//               onBlur={handleBlur}
//               className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
//             />
//             {errors.password && touched.password && (
//               <div className="text-red-400 text-sm mt-1">{errors.password}</div>
//             )}
//           </div>

//           <div>
//             <AtmPasswordField
//               label="Confirm Password"
//               type="password"
//               name="confirmPassword"
//               value={values.confirmPassword}
//               onChange={handleChange}
//               placeholder="Re-enter password"
//               onBlur={handleBlur}
//               className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
//             />
//             {errors.confirmPassword && touched.confirmPassword && (
//               <div className="text-red-400 text-sm mt-1">
//                 {errors.confirmPassword}
//               </div>
//             )}
//           </div>

//           {/* Profile Picture */}
//           <div className="flex flex-col gap-2">
//             <span className="text-gray-200 text-sm">
//               Please upload your profile picture
//             </span>
//             <div className="flex items-center gap-4">
//               <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition">
//                 Choose Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>
//               {values.image && (
//                 <img
//                   src={URL.createObjectURL(values.image)}
//                   alt="Preview"
//                   className="w-16 h-16 object-cover rounded-md border border-white/30"
//                 />
//               )}
//             </div>
//           </div>

//           {/* Submit */}
//           <AtmButtonField
//             type="submit"
//             disabled={isSubmitting}
//             label={isSubmitting ? "Submitting..." : "Register"}
//             className={`w-full p-3 rounded-lg text-white font-bold shadow-lg transition transform ${
//               isSubmitting
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105"
//             }`}
//           />

//           {/* Login link */}
//           <p className="text-center text-sm text-gray-200 mt-4">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-sky-400 font-semibold hover:underline cursor-pointer"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserRegister;
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
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = formikProps;

  const handleFileChange = (event) => {
    const file = event.currentTarget.files?.[0] || null;
    if (file) {
      setFieldValue("image", file);
    }
  };

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
              Sign up to join our community
            </p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 drop-shadow-md">
          Create a new account
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <AtmTextField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John"
                className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
              />
              <div className="text-red-400 text-sm mt-1 min-h-[20px]">
                {errors.firstName && touched.firstName && errors.firstName}
              </div>
            </div>
            <div>
              <AtmTextField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Doe"
                className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
              />
              <div className="text-red-400 text-sm mt-1 min-h-[20px]">
                {errors.lastName && touched.lastName && errors.lastName}
              </div>
            </div>
          </div>

          {/* Age & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <AtmNumberField
                label="Age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="25"
                className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
              />
              <div className="text-red-400 text-sm mt-1 min-h-[20px]">
                {errors.age && touched.age && errors.age}
              </div>
            </div>
            <div>
              <AtmTextField
                label="Mobile"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Mobile Number"
                className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
              />
              <div className="text-red-400 text-sm mt-1 min-h-[20px]">
                {errors.mobile && touched.mobile && errors.mobile}
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <AtmTextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="example@email.com"
              disabled
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Address */}
          <div>
            <AtmTextAreaField
              label="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Address"
              className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
            />
            <div className="text-red-400 text-sm mt-1 min-h-[20px]">
              {errors.address && touched.address && errors.address}
            </div>
          </div>

          {/* Password */}
          <div>
            <AtmPasswordField
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
            />
            <div className="text-red-400 text-sm mt-1 min-h-[20px]">
              {errors.password && touched.password && errors.password}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <AtmPasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Re-enter password"
              className="w-full p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 placeholder-gray-400"
            />
            <div className="text-red-400 text-sm mt-1 min-h-[20px]">
              {errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-200 text-sm">
              Please upload your profile picture
            </span>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {values.image && (
                <img
                  src={URL.createObjectURL(values.image)}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md border border-white/30"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <AtmButtonField
            type="submit"
            disabled={isSubmitting}
            label={
              isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Submitting...
                </div>
              ) : (
                "Register"
              )
            }
            className={`w-full p-3 rounded-lg text-white font-bold shadow-lg transition transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105"
            }`}
          />

          {/* Login link */}
          <p className="text-center text-xs sm:text-sm text-gray-200 mt-3 sm:mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-400 font-semibold hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
