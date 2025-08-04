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

// Tooltip Icon component to reduce code repetition
const NavIcon = ({ to, icon: Icon, label, ariaLabel = label }) => (
  <div className="relative group">
    <Link to={to} aria-label={ariaLabel} className="hover:text-orange-500">
      <Icon size={24} />
    </Link>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      {label}
    </div>
  </div>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <nav
      className="bg-gradient-to-r from-green-200 via-gray-600 to-sky-400 
      dark:bg-gray-700 dark:text-white shadow-lg py-6 px-4 sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2"
        >
          <img
            src="./images/aa.png"
            alt="Acharya Vidhyasagar Foundation Logo"
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] object-cover rounded"
            loading="lazy"
          />
          <span className="relative group font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:animate-pulse">
            AV Foundation
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg z-10 whitespace-nowrap">
              Acharya Vidhyasagar Foundation
            </span>
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle mobile menu"
          className="md:hidden text-orange-700 dark:text-orange-300 transition-transform hover:scale-110"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-4 font-medium text-[17px]">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="px-4 py-2 hover:bg-orange-300 hover:border hover:text-gray-800 dark:hover:text-white hover:rounded transition-all duration-200"
              >
                {label}
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
