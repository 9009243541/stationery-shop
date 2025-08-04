import React from "react";
import { Edit3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";

const UserProfile = ({ imageUrl, name, mobile, email, address, age, userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="relative w-full min-h-screen flex bg-gray-100 overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url('/images/h.avif')`,
          zIndex: 0,
          filter: "blur(20px) brightness(0.6)",
        }}
      ></div>

      {/* Right Side Content */}
      <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center ml-auto p-6 sm:p-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
            {/* Profile Image with Edit Button */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md border-2 border-gray-300 group hover:border-blue-500">
              <img
                src={imageUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 cursor-pointer">
                <Link to={`/update-user/${userId}`} className="text-white text-center">
                  <Edit3 className="w-6 h-6 mb-1" />
                  <span className="text-sm">Update Profile</span>
                </Link>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left w-full">
              {name && (
                <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                  {name}
                </h2>
              )}
              {email && (
                <p className="text-sm text-gray-800 mt-2">
                  <strong>Email:</strong> {email}
                </p>
              )}
              {mobile && (
                <p className="text-sm text-gray-800 mt-1">
                  <strong>Mobile:</strong> {mobile}
                </p>
              )}
              {age && (
                <p className="text-sm text-gray-800 mt-1">
                  <strong>Age:</strong> {age}
                </p>
              )}
              {address && (
                <p className="text-sm text-gray-800 mt-1">
                  <strong>Address:</strong> {address}
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-300" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
          >
            <IconLogout className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
