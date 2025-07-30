import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-20 px-6 text-center">
      <h1 className="text-5xl font-bold text-blue-800 mb-4">
        Welcome to <span className="text-orange-600">Vidhyasagar Stationery</span>
      </h1>
      <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
        Affordable stationery for every student — notebooks, pens, art supplies and more!
      </p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg shadow-md transition-all duration-300">
        Shop Now
      </button>
    </section>
  );
};

export default HeroSection;
