import React from "react";
import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-[#f4f4f4] text-[#333] text-sm">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo and Description */}
        <div className="space-y-4">
          <img
            src="./images/aa.png"
            alt="AV Foundation Logo"
            className="h-12"
          />
          <p className="text-xs leading-relaxed text-[#444]">
            The AV Foundation is a non-profit organisation that strives to
            eliminate classroom hunger by offering discounted stationery items.
          </p>
          <div className="flex space-x-3 text-[#00703c] mt-4">
            <a href="#" className="hover:scale-110 transition">
              <IconBrandInstagram size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <IconBrandLinkedin size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <IconBrandFacebook size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <IconBrandTwitter size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <IconBrandYoutube size={20} />
            </a>
          </div>
        </div>

        {/* ABOUT US */}
        <div>
          <h3 className="font-semibold text-xs uppercase mb-3">About Us</h3>
          <ul className="space-y-2 text-xs leading-5">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/vision" className="hover:underline">
                Our Vision and Mission
              </Link>
            </li>
            <li>
              <Link to="/inspiration" className="hover:underline">
                Inspiration – The story of Hope
              </Link>
            </li>
            <li>
              <Link to="/trustees" className="hover:underline">
                Board of Trustees
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                Tax exemption donation FAQs
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* OUR WORK */}
        <div>
          <h3 className="font-semibold text-xs uppercase mb-3">Our Work</h3>
          <ul className="space-y-2 text-xs leading-5">
            <li>
              <Link to="/work" className="hover:underline">
                Our Work
              </Link>
            </li>
            <li>
              <Link to="/feeding" className="hover:underline">
                Feeding For Education
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

        {/* DONATE & INVOLVEMENT */}
        <div>
          <h3 className="font-semibold text-xs uppercase mb-3">Donate</h3>
          <ul className="space-y-2 text-xs leading-5">
            <li>
              <Link to="/donate" className="hover:underline">
                Online Donations
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
          </ul>
          <h4 className="font-semibold mt-4 mb-2 text-xs uppercase">
            Get in Touch
          </h4>
          <ul className="space-y-2 text-xs leading-5">
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
          <h4 className="font-semibold mt-4 mb-2 text-xs uppercase">
            Get Involved
          </h4>
          <ul className="space-y-2 text-xs leading-5">
            <li>
              <Link to="/volunteer" className="hover:underline">
                Future Shaper
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="font-semibold text-xs uppercase mb-3">
            Subscribe E-newsletter
          </h3>
          <form className="space-y-3 text-xs">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            <input
              type="email"
              placeholder="Email Id"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded text-xs uppercase"
            >
              Submit
            </button>
          </form>
          <div className="mt-6">
            <img
              src="./images/isto.jpg"
              alt="Great Place to Work Badge"
              className="h-16"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 text-center py-4 text-xs text-gray-500">
        <p>Charity Id : AAATTC6468P</p>
        <p>&copy; {new Date().getFullYear()} Acharya VidhyaSagar Foundation</p>
      </div>
    </footer>
  );
};

export default Footer;
