import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconShoppingCartPlus,
  IconUser,
  IconMenu2,
  IconX,
  IconHeart,
  IconUserCog,
} from "@tabler/icons-react";
import MobileSideNav from "./MobileSideNav";

import { motion } from "framer-motion";

const NavIcon = ({ to, icon: Icon, label, ariaLabel = label }) => (
  <motion.div whileHover={{ scale: 1.1 }} className="relative group">
    <Link
      to={to}
      aria-label={ariaLabel}
      className="text-slate-700 dark:text-white hover:text-emerald-600 transition-colors"
    >
      <Icon size={24} />
    </Link>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      {label}
    </div>
  </motion.div>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/category", label: "Category" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 text-slate-800 dark:text-white shadow-md py-4 px-6 sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold flex items-center gap-2 no-underline"
        >
          <img
            src="./images/aa.png"
            alt="Acharya Vidhyasagar Foundation Logo"
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] object-cover rounded"
            loading="lazy"
          />
          <span className="relative group font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-orange-400 to-blue-500 hover:animate-pulse">
            AV Foundation
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg z-10 whitespace-nowrap">
              Acharya Vidhyasagar Foundation
            </span>
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle mobile menu"
          className="md:hidden text-emerald-600 dark:text-emerald-300 transition-transform hover:scale-110"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-[16px]">
          {navLinks.map(({ to, label }) => (
            <li key={to} className="group relative">
              <Link
                to={to}
                className={`px-3 py-2 transition-colors duration-300 !no-underline relative group
    ${
      location.pathname === to
        ? "text-blue-600 dark:text-white font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600"
        : "text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
    }
  `}
              >
                {label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-4">
          <NavIcon to="/wishlist" icon={IconHeart} label="Wishlist" />
          {isLoggedIn ? (
            <NavIcon to="/user-profile" icon={IconUser} label="Profile" />
          ) : (
            <NavIcon to="/login" icon={IconUserCog} label="Login" />
          )}
          <NavIcon to="/cart" icon={IconShoppingCartPlus} label="Cart" />
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
