import React from "react";
import { Edit3 } from "lucide-react"; // Tabler icon alternative
import { Link, useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";

const UserProfile = ({
  imageUrl,
  name,
  mobile,
  email,
  address,
  age,
  userId,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    window.location.reload(); // Refresh the page
    navigate("/");
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
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 relative">
            {/* Profile Image with Edit Button */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-white group">
              <img
                src={imageUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 cursor-pointer">
                <Link
                  to={`/update-user/${userId}`}
                  className="text-white text-sm mt-2"
                >
                  <Edit3 className="text-white w-6 h-6" />
                  <span className="text-sm text-white mt-1">
                    Update Profile
                  </span>
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
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Email:</strong> {email}
                </p>
              )}
              {mobile && (
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Mobile:</strong> {mobile}
                </p>
              )}
              {age && (
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Age:</strong> {age}
                </p>
              )}
              {address && (
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Address:</strong> {address}
                </p>
              )}
            </div>
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-10 flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200"
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
