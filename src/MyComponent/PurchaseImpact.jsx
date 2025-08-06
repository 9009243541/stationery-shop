import React from 'react';
import { FaHandsHelping, FaUtensils, FaSchool } from 'react-icons/fa';

const PurchaseImpact = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 shadow-lg mt-10 rounded-xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          ❤️ Your Purchase Creates a Ripple of Hope
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Every product you buy contributes to our mission — feeding hungry children, supporting education, and uplifting communities through our partner NGO efforts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <FaUtensils className="text-orange-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Nutritious Meals</h4>
            <p className="text-sm text-gray-600">
              A portion of your purchase helps provide fresh meals to underprivileged children daily.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <FaSchool className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Education Support</h4>
            <p className="text-sm text-gray-600">
              Funds go towards school kits, books, and resources for children in need.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <FaHandsHelping className="text-green-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Uplifting Communities</h4>
            <p className="text-sm text-gray-600">
              We support health drives, clean water projects, and women empowerment initiatives.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-10">
          Together, we make every order count. 🌱
        </p>
      </div>
    </div>
  );
};

export default PurchaseImpact;
