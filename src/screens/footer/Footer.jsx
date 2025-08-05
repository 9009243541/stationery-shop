import React from "react";
import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconMail,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
          <h1 className="text-xl font-bold mb-2">Av Foundation</h1>
          <p className="text-sm text-gray-400">
            Committed to empowering lives through education, health, and
            community service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:underline">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <IconPhone size={18} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <IconMail size={18} /> info@avfoundation.org
            </li>
            <li className="flex items-center gap-2">
              <IconMapPin size={18} /> Indore, Madhya Pradesh, India
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <IconBrandFacebook size={22} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <IconBrandInstagram size={22} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400">
              <IconBrandTwitter size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} Av Foundation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
