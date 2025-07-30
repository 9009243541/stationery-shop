import React from "react";
import {
  IconMapPin,
  IconPhoneCall,
  IconMail,
} from "@tabler/icons-react";

const Contact = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            Have questions about our foundation, volunteering, or partnerships?
            Reach out — we’d love to hear from you!
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <IconMapPin size={24} className="text-blue-600 mt-1" />
              <div>
                <p className="text-lg font-semibold text-blue-600">Address</p>
                <p className="text-gray-700">
                  109, Indore Rd, Gorakund, Chhipa Bakhal, Indore, MP - 452002
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <IconPhoneCall size={24} className="text-blue-600 mt-1" />
              <div>
                <p className="text-lg font-semibold text-blue-600">Phone</p>
                <p className="text-gray-700">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <IconMail size={24} className="text-blue-600 mt-1" />
              <div>
                <p className="text-lg font-semibold text-blue-600">Email</p>
                <p className="text-gray-700">contact@vidhyasagarfoundation.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-blue-700 mb-6">
            Send Us a Message
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full text-lg font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
