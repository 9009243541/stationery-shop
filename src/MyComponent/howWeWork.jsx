import React from 'react';

const initiatives = [
  {
    title: 'PM-POSHAN Programme',
    image: '/images/pm-poshan.jpg', // Replace with actual path
    description: 'Providing mid-day meals to school children to support education through nutrition.',
  },
  {
    title: 'Breakfast',
    image: '/images/breakfast.jpg',
    description: 'A nourishing start to the day for underprivileged children to keep them healthy and alert.',
  },
  {
    title: 'Anganwadi Feeding',
    image: '/images/agnawadi.jpg',
    description: 'Supplementary nutrition for toddlers and mothers through Anganwadis.',
  },
  {
    title: 'Homeless Mother',
    image: '/images/mother.jpg',
    description: 'Caring for homeless mothers through food, shelter, and emotional support.',
  },
];

const HowWeWork = () => {
  return (
    <section className="py-12 px-6 bg-[#f9fafb] text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Little smiles, big impact: Our Initiatives
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4" style={{ marginTop: '20px' }  }>
          {initiatives.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-200"
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
