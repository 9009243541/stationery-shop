import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";
import { motion } from "framer-motion";

const Avatar = ({ imageUrl, userId }) => {
  return (
    <div className="relative w-36 h-36 rounded-full overflow-hidden border-8 border-white shadow-2xl group hover:border-blue-500 transition-all duration-500 cursor-pointer">
      <img
        src={imageUrl || "/images/default-avatar.png"}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-base transition-opacity rounded-full">
        <Link to={`/update-user/${userId}`} className="flex flex-col items-center space-y-1">
          <Edit3 className="w-7 h-7" />
          <span className="font-semibold">Update</span>
        </Link>
      </div>
    </div>
  );
};

const UserProfile = ({ imageUrl, name, mobile, email, address, age, userId }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-gray-200 font-sans overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-blue-800 via-indigo-900 to-purple-900 opacity-90"
        style={{ filter: "blur(20px) brightness(0.6)", zIndex: 0 }}
      />

      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 hidden md:flex w-full md:w-1/2 flex-col items-center justify-center p-8 xl:p-14 bg-white/10 backdrop-blur-xl rounded-r-[3rem] space-y-10 shadow-lg"
      >
        <img
          src="/images/kids-study.jpg"
          alt="Kids Studying"
          className="w-4/5 max-w-md rounded-3xl shadow-2xl ring-8 ring-white/30 transition-transform transform hover:scale-105 duration-500"
        />
        <div className="flex items-center space-x-5">
          <img
            src="/images/aa.png"
            alt="Logo"
            className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
          />
          <div>
            <h1 className="text-5xl font-extrabold drop-shadow-lg">Av Foundation</h1>
            <p className="text-xl italic text-white/80 tracking-wide">
              Empowering Every Child
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex-1 flex items-center justify-center p-8 sm:p-12"
      >
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <Avatar imageUrl={imageUrl} userId={userId} />

            <div className="w-full text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold capitalize text-gray-900 drop-shadow-md">
                {name || "No Name"}
              </h2>
              <div className="mt-4 space-y-3 text-base sm:text-lg text-gray-700">
                {email && (
                  <p>
                    <span className="font-semibold">Email:</span> {email}
                  </p>
                )}
                {mobile && (
                  <p>
                    <span className="font-semibold">Mobile:</span> {mobile}
                  </p>
                )}
                {age && (
                  <p>
                    <span className="font-semibold">Age:</span> {age}
                  </p>
                )}
                {address && (
                  <p>
                    <span className="font-semibold">Address:</span> {address}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-400" />

          <motion.button
            onClick={handleLogout}
            whileTap={{ scale: 0.97 }}
            disabled={isLoggingOut}
            className={`w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-white shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
              isLoggingOut
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            }`}
          >
            <IconLogout className="w-6 h-6" />
            <span className="text-xl font-semibold">
              {isLoggingOut ? "Logging Out..." : "Logout"}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
