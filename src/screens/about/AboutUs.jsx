import React from "react";
import {
  IconCheck,
  IconMapPin,
  IconClock,
} from "@tabler/icons-react";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-lg bg-white p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-6 border-b-2 border-blue-200 inline-block">
          About Acharya Vidhyasagar Foundation
        </h2>

        <p className="text-gray-700 text-lg mb-5 leading-relaxed">
          At{" "}
          <span className="font-semibold text-blue-600">
            Acharya Vidhyasagar Foundation
          </span>
          , we are driven by the vision of nurturing values, education, and
          service. Our foundation is committed to empowering communities by
          supporting educational, cultural, and social initiatives that uplift
          lives with compassion and wisdom.
        </p>

        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          From{" "}
          <span className="italic text-blue-600">
            stationery support for students, scholarships, community workshops,
            and educational campaigns
          </span>{" "}
          — we actively engage in programs that build a better tomorrow through
          knowledge and kindness.
        </p>

        <h3 className="text-2xl font-bold text-blue-700 mb-4">
          What Makes Us Different?
        </h3>
        <ul className="list-none space-y-3 mb-10">
          {[
            "Rooted in the teachings of Acharya Vidhyasagar Ji Maharaj",
            "Focused on educational and social upliftment",
            "Transparent, honest, and volunteer-driven",
            "Programs for students, women, and underprivileged communities",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-800 text-lg">
              <IconCheck size={22} className="text-green-600 mt-1" />
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold text-blue-700 mb-4">Visit Us</h3>
        <div className="text-gray-700 text-lg space-y-2">
          <p className="flex items-center gap-2">
            <IconMapPin size={20} className="text-red-500" />
            <span>
              <strong>Khajuri Bazar 109</strong>, Indore, Madhya Pradesh
            </span>
          </p>
          <p className="flex items-center gap-2">
            <IconClock size={20} className="text-yellow-500" />
            <span>
              <strong>10AM - 10PM</strong>, Open All Days
            </span>
          </p>
          <p>
            You can also{" "}
            <span className="font-semibold text-blue-600">connect online</span> to
            support or participate in our activities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
