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
          isActive ? "text-[#206577]" : "text-gray-700"
        } group-hover:text-[#206577]`}
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
  const { pathname } = location;

  const isOnDiscountedStationery =
    pathname.startsWith("/discounted-stationery") || pathname === "/checkout";

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" }, 
    { to: "/galary", label: "Galary" },
    { to: "/our-reach", label: "Our Reach" },
    { to: "/impact-reports", label: "Imapact Reports" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contact", label: "Contact Us" },
    
   
  ];

  // Dynamically inject links if user is on discounted-stationery pages
  if (isOnDiscountedStationery) {
    navLinks.splice(
      1,
      0,
      { to: "/discounted-stationery/category", label: "Category" },
      { to: "/discounted-stationery/product", label: "Products" }
    );
  }

  return (
    <nav className="bg-white border-b border-gray-300 shadow-md py-3 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img
            src="./images/aa.png"
            alt="AV Foundation Logo"
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] object-cover rounded"
            loading="lazy"
          />
          <div className="leading-tight group relative">
            <h1 className="text-[#1e4f91] text-[18px] sm:text-[20px] font-bold font-serif">
              AV Foundation
            </h1>
            <p className="text-[#f1b71c] text-[11px] sm:text-[12px] italic font-medium tracking-wide">
              Nourishing Lives with Purpose
            </p>
            <span className="absolute top-full left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg z-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Acharya Vidhyasagar Foundation
            </span>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle mobile menu"
          className="md:hidden text-[#1e4f91] transition-transform hover:scale-110"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 font-semibold text-sm sm:text-[15px]">
          {navLinks.map(({ to, label }) => {
            const isActive = pathname === to;
            return (
              <li key={to} className="relative group">
                <Link
                  to={to}
                  className={`px-3 py-2 transition-all duration-300 !no-underline relative ${
                    isActive
                      ? "text-[#206577] font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#206577]"
                      : "text-gray-800 hover:text-[#206577]"
                  }`}
                >
                  {label}
                  {!isActive && (
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#206577] transition-all duration-300 group-hover:w-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-4 items-center">
          <NavIcon
            to="/discounted-stationery/wishlist"
            icon={IconHeart}
            label="Wishlist"
          />
          {isLoggedIn ? (
            <NavIcon to="/user-profile" icon={IconUser} label="Profile" />
          ) : (
            <NavIcon to="/login" icon={IconUserCog} label="Login" />
          )}
          <NavIcon
            to="/discounted-stationery/cart"
            icon={IconShoppingCartPlus}
            label="Cart"
          />
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
