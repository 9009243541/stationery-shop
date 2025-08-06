import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IconHome,
  IconInfoCircle,
  IconShoppingCart,
  IconPhone,
  IconCategory,
  IconHeart,
  IconShoppingCartPlus,
  IconUser,
  IconLogout,
  IconX,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", to: "/", icon: IconHome },
  { label: "Products", to: "/product", icon: IconShoppingCart },
  { label: "About", to: "/about", icon: IconInfoCircle },
  { label: "Contact", to: "/contact", icon: IconPhone },
  { label: "Category", to: "/category", icon: IconCategory },
];

const bottomIcons = [
  { label: "Wishlist", to: "/wishlist", icon: IconHeart },
  { label: "Cart", to: "/cart", icon: IconShoppingCartPlus },
  { label: "Profile", to: "/user-profile", icon: IconUser },
];

const MobileSideNav = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[60]"
        onClick={onClose}
      ></div>

      {/* Side Nav */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 w-[85%] max-w-[300px] h-screen bg-white text-[#1e1e1e] shadow-2xl z-[100] flex flex-col justify-between"
      >
        {/* Top Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-gray-200">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <img
              src="./images/aa.png"
              alt="AV Foundation"
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <h1 className="text-[#1e4f91] font-bold text-[17px] font-serif">
                AV Foundation
              </h1>
            </div>
          </Link>
          <button onClick={onClose}>
            <IconX size={24} className="text-[#1e4f91]" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-5 pt-4 space-y-2">
          {navItems.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg text-[#1e1e1e] hover:bg-[#f0f4f3] hover:shadow transition-all duration-200"
            >
              <Icon size={20} className="text-[#206577]" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-5 pt-0 border-t border-gray-200 space-y-4">
          {/* Icons */}
          <div className="flex gap-6">
            {bottomIcons.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className="hover:text-[#206577] transition-colors"
              >
                <Icon size={24} />
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <Link
            to="/logout"
            onClick={onClose}
            className="flex items-center gap-3 mt-4 p-3 rounded-lg bg-[#f1b71c] hover:bg-[#e0a70b] text-white justify-center transition-all"
          >
            <IconLogout size={20} />
            <span className="text-sm font-semibold">Log Out</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default MobileSideNav;
