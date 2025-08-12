import React from "react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src="/images/AV_about.jpeg"
            alt="About NGO"
            className="rounded-3xl shadow-2xl object-cover w-full max-h-[420px] mx-auto"
          />
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
            Who We Are
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
            We are a passionate non-profit organization committed to creating
            meaningful change. Our focus is to uplift underprivileged
            communities by providing access to education, nutrition, and
            healthcare.
          </p>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Every initiative we take aims at building a brighter and
            sustainable future.
            <br />
            <span className="font-semibold text-blue-600">
              Join us in making a real difference — one life at a time.
            </span>
          </p>

          <a
            href="/donate"
            className="inline-block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-lg font-semibold rounded-full px-8 py-3 shadow-lg transition duration-300"
          >
            Support Our Mission
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
