import React, { useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  IconBook,
  IconCamera,
  IconUsersGroup,
  IconUserCog,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const MobileSideNav = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const isLoggedIn = !!localStorage.getItem("token");
  const drawerRef = useRef();

  const isOnDiscountedStationery =
    pathname.startsWith("/discounted-stationery") || pathname === "/checkout";

  const navItems = useMemo(() => {
    const baseItems = [
      { label: "Home", to: "/", icon: IconHome },
      { label: "About Us", to: "/about", icon: IconInfoCircle },
      { label: "Galary", to: "/galary", icon: IconCamera },
      { label: "Our Reach", to: "/our-reach", icon: IconUsersGroup },
      { label: "Impact Reports", to: "/impact-reports", icon: IconBook },
      { label: "Blogs", to: "/blogs", icon: IconBook },
      { label: "Contact Us", to: "/contact", icon: IconPhone },
    ];

    if (isOnDiscountedStationery) {
      baseItems.splice(1, 0, {
        label: "Products",
        to: "/discounted-stationery/product",
        icon: IconShoppingCart,
      });
    }

    return baseItems;
  }, [pathname]);

  const bottomIcons = useMemo(() => {
    const base = [
      {
        label: "Wishlist",
        to: "/discounted-stationery/wishlist",
        icon: IconHeart,
      },
      {
        label: "Cart",
        to: "/discounted-stationery/cart",
        icon: IconShoppingCartPlus,
      },
    ];

    if (isLoggedIn) {
      base.push({
        label: "Profile",
        to: "/user-profile",
        icon: IconUser,
      });
    } else {
      base.push({
        label: "Login",
        to: "/login",
        icon: IconUserCog,
      });
    }

    return base;
  }, [isLoggedIn]);

  // 🔹 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // token clear
    onClose(); // Drawer close
    navigate("/"); // redirect to login
  };

  // Disable scroll and setup ESC key
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Auto-close on route change
  useEffect(() => {
    if (isOpen) onClose();
  }, [pathname]);

  // Swipe to close
  useEffect(() => {
    let touchStartX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchEndX - touchStartX > 100) {
        onClose();
      }
    };

    const drawer = drawerRef.current;
    if (drawer) {
      drawer.addEventListener("touchstart", handleTouchStart);
      drawer.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (drawer) {
        drawer.removeEventListener("touchstart", handleTouchStart);
        drawer.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      {/* Side Nav */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        ref={drawerRef}
        className="fixed top-0 left-0 w-[85%] max-w-[300px] h-screen bg-white text-[#1e1e1e] shadow-2xl z-[100] flex flex-col justify-between"
      >
        {/* Top Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-gray-200">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <img
              src="/images/aa.png"
              alt="AV Foundation"
              className="w-10 h-10 rounded object-cover"
            />
            <h1 className="text-[#1e4f91] font-bold text-[17px] font-serif">
              AV Foundation
            </h1>
          </Link>
          <button onClick={onClose}>
            <IconX size={24} className="text-[#1e4f91]" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-5 pt-4 space-y-2 overflow-y-auto">
          {navItems.map(({ label, to, icon: Icon }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#f0f4f3] shadow text-[#206577]"
                    : "text-[#1e1e1e] hover:bg-[#f0f4f3] hover:shadow"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-5 pt-0 border-t border-gray-200 space-y-4">
          <div className="flex gap-6">
            {bottomIcons.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                aria-label={label}
                className="hover:text-[#206577] transition-colors"
              >
                <Icon size={24} />
              </Link>
            ))}
          </div>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 mt-4 p-3 rounded-lg bg-[#f1b71c] hover:bg-[#e0a70b] text-white justify-center transition-all w-full"
            >
              <IconLogout size={20} />
              <span className="text-sm font-semibold">Log Out</span>
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MobileSideNav;
