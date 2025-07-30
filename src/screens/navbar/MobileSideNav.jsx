import React from "react";
import { Link } from "react-router-dom";
import { IconHeart, IconShoppingCartPlus, IconUser } from "@tabler/icons-react";

const MobileSideNav = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-60"
        onClick={onClose}
      ></div>

      {/* Side Nav */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-yellow-100 dark:bg-gray-900 shadow-lg z-100 p-6 transition-transform transform md:hidden">
        <div className="flex flex-col space-y-4 text-orange-700 dark:text-orange-300 font-medium">
          <Link to="/" onClick={onClose} className="hover:text-orange-500">
            Home
          </Link>
          <Link to="/product" onClick={onClose} className="hover:text-orange-500">
            Products
          </Link>
          <Link to="/about" onClick={onClose} className="hover:text-orange-500">
            About
          </Link>
          <Link to="/contact" onClick={onClose} className="hover:text-orange-500">
            Contact
          </Link>
          <Link to="/category" onClick={onClose} className="hover:text-orange-500">
            Category
          </Link>

          <div className="flex gap-6 pt-4 border-t border-orange-300 dark:border-orange-500">
            <Link to="/wishlist" onClick={onClose} className="hover:text-orange-500">
              < IconHeart size={24} />
            </Link>
            <Link to="/cart" onClick={onClose} className="hover:text-orange-500">
              <IconShoppingCartPlus size={24} />
            </Link>
            <Link to="/user" onClick={onClose} className="hover:text-orange-500">
              <IconUser size={24} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSideNav;
