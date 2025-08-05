import React from "react";
import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

const Footer = () => (
  <footer className="bg-white text-gray-800 text-xs border-t border-gray-200 py-10">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 px-4">
      {/* Logo & Tagline */}
      <div className="text-sm leading-relaxed">
        <h1 className="font-bold text-base mb-2">AV Foundation</h1>
        <p className="mb-3">
          We eliminate classroom hunger by offering discounted stationery items.
        </p>
        <div className="flex items-center gap-3 bg-black px-3 py-2 rounded w-fit">
          <span className="font-medium text-white">Follow us:</span>
          <a href="#" className="hover:text-blue-600 transition">
            <IconBrandFacebook size={16} />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <IconBrandInstagram size={16} />
          </a>
          <a href="#" className="hover:text-sky-500 transition">
            <IconBrandTwitter size={16} />
          </a>
        </div>
      </div>

      {/* About Us */}
      <div>
        <h2 className="font-semibold mb-2 text-sm">About Us</h2>
        <ul className="space-y-3 mt-4">
          <li>
            <Link to="/about" className="hover:underline">
              Vision & Mission
            </Link>
          </li>
          <li>
            <Link to="/inspiration" className="hover:underline">
              Inspiration
            </Link>
          </li>
          <li>
            <Link to="/trustees" className="hover:underline">
              Board of Trustees
            </Link>
          </li>
          <li>
            <Link to="/faq" className="hover:underline">
              Tax Exemption FAQs
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </li>
        </ul>
      </div>

      {/* Our Work */}
      <div>
        <h2 className="font-semibold mb-2 text-sm">Our Work</h2>
        <ul className="space-y-3 mt-4">
          <li>
            <Link to="/feeding" className="hover:underline">
              Feeding for Education
            </Link>
          </li>
          <li>
            <Link to="/midday-meal" className="hover:underline">
              Mid‑Day Meal
            </Link>
          </li>
          <li>
            <Link to="/relief" className="hover:underline">
              Relief Feeding
            </Link>
          </li>
          <li>
            <Link to="/research" className="hover:underline">
              Research & Advocacy
            </Link>
          </li>
          <li>
            <Link to="/beyond-meals" className="hover:underline">
              Beyond Meals
            </Link>
          </li>
        </ul>
      </div>

      {/* Get Involved */}
      <div>
        <h2 className="font-semibold mb-2 text-sm">Get Involved</h2>
        <ul className="space-y-3 mt-4 ml-0">
          <li>
            <Link to="/donate" className="hover:underline">
              Donate Online
            </Link>
          </li>
          <li>
            <Link to="/sponsor-school" className="hover:underline">
              Sponsor a School
            </Link>
          </li>
          <li>
            <Link to="/sponsor-kitchen" className="hover:underline">
              Sponsor a Kitchen
            </Link>
          </li>
          <li>
            <Link to="/fundraise" className="hover:underline">
              Fundraise With Us
            </Link>
          </li>
          <li>
            <Link to="/volunteer" className="hover:underline">
              Volunteer
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h2 className="font-semibold mb-2 text-sm">Contact</h2>
        <ul className="space-y-4 mt-4">
          <li>Bengaluru, India</li>
          <li>Phone: +91 80 3014 3400</li>
          <li>Email: info@avfoundation.org</li>
        </ul>
      </div>
    </div>

    {/* Bottom Links */}
    <div className="mt-8 text-center">
      <Link to="/privacy" className="hover:underline mx-2">
        Privacy Policy
      </Link>
      <Link to="/sitemap" className="hover:underline mx-2">
        Sitemap
      </Link>
    </div>

    {/* Copyright */}
    <div className="mt-4 text-center text-gray-500">
      &copy; {new Date().getFullYear()} Acharya VidhyaSagar Foundation. All
      rights reserved.
    </div>
  </footer>
);

export default Footer;
