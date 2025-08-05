import React from 'react';

const WorkSection = () => {
  return (
    <section className="bg-white text-black py-12 px-4 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Work</h2>
        <p className="text-sm md:text-base leading-relaxed mb-6">
          At <span className="font-semibold">Acharya VidhyaSagar Foundation</span>, we believe that education is every child's right.
          Each year, we organize a <h2><strong>free notebook distribution drive</strong></h2> for underprivileged children.
        </p>
        <p className="text-sm md:text-base leading-relaxed mb-6">
          In addition, we provide essential <strong> stationery items at highly discounted prices</strong>, 
          ensuring affordability for everyone. 
          All profits from these sales go directly toward feeding and supporting underprivileged students.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">📚 Free Copy Distribution</h3>
            <p className="text-sm">
              Once a year, we distribute free notebooks and school supplies to children from underprivileged communities.
            </p>
          </div>

          <div className="border p-4 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">🛍️ Discounted Stationery</h3>
            <p className="text-sm">
              Need notebooks anytime? Get them at **minimum cost** from our website. All earnings directly support children in need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
