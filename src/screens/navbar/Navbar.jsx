import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  IconShoppingCartPlus,
  IconUser,
  IconMenu2,
  IconX,
  IconHeart,
  IconUserCog,
} from "@tabler/icons-react";
import MobileSideNav from "./MobileSideNav";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  return (
    <nav className="bg-gradient-to-r from-green-200 via-gray-600 to-sky-400 backdrop-blur-sm dark:bg-gray-700 dark:text-white shadow-lg py-6 px-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2"
        >
          <img
            src="./images/aa.png"
            alt="Acharya vidhyasagar foundation"
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] object-cover rounded"
          />
          <span className="relative group cursor-pointer font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:animate-pulse">
            AV Foundation
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg z-10 whitespace-nowrap">
              Acharya Vidhyasagar Foundation
            </span>
          </span>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          aria-label="Toggle mobile menu"
          className="md:hidden text-orange-700 dark:text-orange-300"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex  space-x-4 font-medium text-[17px]">
          <li>
            <Link
              to="/"
              className="px-4 py-2 hover:bg-orange-300 hover:border hover:text-gray-800 hover:rounded transition-all duration-200 "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="px-4 py-2 hover:bg-orange-300 hover:border hover:text-gray-800 hover:rounded transition-all duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-4 py-2 hover:bg-orange-300 hover:border hover:text-gray-800 hover:rounded transition-all duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-4 py-2 hover:bg-orange-300 hover:border hover:text-gray-800 hover:rounded transition-all duration-200"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/category"
              className="px-4 py-2 hover:bg-orange-300 hover:border hover:text-gray-800 hover:rounded transition-all duration-200"
            >
              Category
            </Link>
          </li>
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-4">
          <div className="relative group">
            <Link to="/wishlist" className="hover:text-orange-500">
              <IconHeart size={24} />
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Wish Lists
            </div>
          </div>
          {/* Login Icon */}
          {/* <div className="relative group">
            <Link to="/user" className="hover:text-orange-500">
              <IconUser size={24} />
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Login
            </div>
          </div> */}
          {isLoggedIn ? (
            <div className="relative group">
              <Link to="/user-profile" className="hover:text-orange-500">
                <IconUser size={24} />
              </Link>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Profile
              </div>
            </div>
          ) : (
            <div className="relative group">
              <Link to="/login" className="hover:text-orange-500">
                <IconUserCog size={24} />
              </Link>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Login
              </div>
            </div>
          )}

          <div className="relative group">
            <Link to="/cart" className="hover:text-orange-500">
              <IconShoppingCartPlus size={24} />
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Cart
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Side Navigation */}
      <MobileSideNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
