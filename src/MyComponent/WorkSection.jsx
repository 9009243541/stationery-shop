import React from 'react';
import { useNavigate } from 'react-router-dom';

const WorkSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white text-black py-12 px-4 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Work</h2>

        <p className="text-sm md:text-base leading-relaxed mb-6">
          At <span className="font-semibold">Acharya VidhyaSagar Foundation</span>, we believe that education is every child's right.
          Each year, we organize a <strong>free notebook distribution drive</strong> for underprivileged children.
        </p>

        <p className="text-sm md:text-base leading-relaxed mb-6">
          In addition, we provide essential <strong>stationery items at highly discounted prices</strong>, 
          ensuring affordability for everyone. All profits from these sales go directly toward feeding and supporting underprivileged students.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1 */}
          <div className="border p-4 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">📚 Free Copy Distribution</h3>
            <p className="text-sm mb-4">
              Once a year, we distribute free notebooks and school supplies to children from underprivileged communities.
            </p>
            <button
              onClick={() => navigate('/free-distribution')}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Learn More
            </button>
          </div>

          {/* Box 2 */}
          <div className="border p-4 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">🛍️ Discounted Stationery</h3>
            <p className="text-sm mb-4">
              Need notebooks anytime? Get them at <strong>minimum cost</strong> from our website. All earnings directly support children in need.
            </p>
            <button
              onClick={() => navigate('/discounted-stationery')}
              className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
