import React from 'react';
import { FaHandHoldingHeart, FaDonate, FaPeopleCarry, FaBook } from 'react-icons/fa';

const HowHelpSection = () => {
  return (
    <section className="py-10 px-6 md:px-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        How You Can Benefit or Contribute
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Benefits Section */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-green-700">How You Can Benefit</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaBook className="text-green-500 mt-1 mr-3" size={20} />
              <span>
                <strong>Free Stationery</strong> – Once a year, we provide free copies and supplies to students in need.
              </span>
            </li>
            <li className="flex items-start">
              <FaBook className="text-green-500 mt-1 mr-3" size={20} />
              <span>
                <strong>Affordable Prices</strong> – Access high-quality notebooks and materials at lower rates than other stores.
              </span>
            </li>
            <li className="flex items-start">
              <FaBook className="text-green-500 mt-1 mr-3" size={20} />
              <span>
                <strong>Community Events</strong> – Attend educational camps, awareness programs, and more.
              </span>
            </li>
          </ul>
        </div>

        {/* Contribution Section */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">How You Can Contribute</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaDonate className="text-blue-500 mt-1 mr-3" size={20} />
              <span>
                <strong>Donate</strong> – Help us by donating stationery or funds for purchasing bulk educational items.
              </span>
            </li>
            <li className="flex items-start">
              <FaPeopleCarry className="text-blue-500 mt-1 mr-3" size={20} />
              <span>
                <strong>Volunteer</strong> – Join our NGO in packaging, distribution, and organizing drives.
              </span>
            </li>
            <li className="flex items-start">
              <FaHandHoldingHeart className="text-blue-500 mt-1 mr-3" size={20} />
              <span>
                <strong>Sponsor</strong> – Partner with us to adopt a school or support a village’s education.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowHelpSection;
