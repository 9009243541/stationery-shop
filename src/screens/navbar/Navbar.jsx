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

const NavIcon = ({ to, icon: Icon, label, ariaLabel = label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotateY: 360 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative group"
      style={{ perspective: 1000 }}
    >
      <Link
        to={to}
        aria-label={ariaLabel}
        className={`transition-colors duration-300 ${
          isActive ? "text-emerald-600" : "text-gray-700 dark:text-white"
        } group-hover:text-emerald-500`} 
      >
        <Icon size={24} />
      </Link>

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-black text-white text-xs opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 whitespace-nowrap z-50">
        {label}
      </div>
    </motion.div>
  );
};

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
    <nav className="bg-white dark:bg-gray-900 shadow-md py-3 px-6 sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img
            src="./images/aa.png"
            alt="AV Foundation Logo"
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] object-cover rounded"
            loading="lazy"
          />
          <span className="relative group font-extrabold text-transparent text-lg sm:text-xl bg-clip-text bg-gradient-to-r from-emerald-600 via-orange-400 to-blue-500 hover:animate-pulse">
            AV Foundation
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg z-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Acharya Vidhyasagar Foundation
            </span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle mobile menu"
          className="md:hidden text-emerald-600 dark:text-emerald-300 transition-transform hover:scale-110"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 font-semibold text-sm sm:text-[15px]">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to} className="relative group">
                <Link
                  to={to}
                  className={`px-3 py-2 transition-all duration-300 !no-underline relative ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-emerald-600"
                      : "text-gray-900 dark:text-white hover:text-emerald-600"
                  }`}
                >
                  {label}
                  {!isActive && (
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-4 items-center">
          <NavIcon to="/wishlist" icon={IconHeart} label="Wishlist" />
          {isLoggedIn ? (
            <NavIcon to="/user-profile" icon={IconUser} label="Profile" />
          ) : (
            <NavIcon to="/login" icon={IconUserCog} label="Login" />
          )}
          <NavIcon to="/cart" icon={IconShoppingCartPlus} label="Cart" />
        </div>
      </div>

      {/* Mobile Side Nav */}
      <MobileSideNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
