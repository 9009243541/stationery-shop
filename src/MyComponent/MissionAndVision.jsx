
import React from "react";

const MissionAndVision = () => {
  return (
    <section className="bg-yellow-50 py-16 px-6 lg:px-20 ">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Mission & Vision
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          {/* Mission */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">🎯 Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to empower individuals and communities by providing
              education, support, and opportunities that foster growth, equality,
              and well-being. We strive to create sustainable change through
              innovation, compassion, and collaboration.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">🌟 Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              Our vision is to build a society where every person has access to
              knowledge, resources, and opportunities to live with dignity and
              achieve their fullest potential. We dream of a future that is
              inclusive, sustainable, and filled with hope.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
