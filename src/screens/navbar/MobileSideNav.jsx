import React from "react";
import { Link } from "react-router-dom";
import { IconHeart, IconShoppingCartPlus, IconUser } from "@tabler/icons-react";

import { motion } from "framer-motion"; // 👈 Add this

const MobileSideNav = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      ></div>

      {/* Side Nav Panel with Animation */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 w-64 h-screen bg-emerald-50 dark:bg-slate-900 text-slate-800 dark:text-white shadow-lg z-[100] p-6 md:hidden"
      >
        <div className="flex flex-col space-y-5 font-medium text-lg">
          <Link to="/" onClick={onClose} className="hover:text-emerald-600">
            Home
          </Link>
          <Link to="/product" onClick={onClose} className="hover:text-emerald-600">
            Products
          </Link>
          <Link to="/about" onClick={onClose} className="hover:text-emerald-600">
            About
          </Link>
          <Link to="/contact" onClick={onClose} className="hover:text-emerald-600">
            Contact
          </Link>
          <Link to="/category" onClick={onClose} className="hover:text-emerald-600">
            Category
          </Link>

          {/* Icons */}
          <div className="flex justify-start gap-6 pt-6 border-t border-gray-300 dark:border-gray-600">
            <Link to="/wishlist" onClick={onClose} className="hover:text-emerald-600">
              <IconHeart size={24} />
            </Link>
            <Link to="/cart" onClick={onClose} className="hover:text-emerald-600">
              <IconShoppingCartPlus size={24} />
            </Link>
            <Link to="/user-profile" onClick={onClose} className="hover:text-emerald-600">
              <IconUser size={24} />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};


export default MobileSideNav;
