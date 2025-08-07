import React from "react";
import { Link } from "react-router-dom";
import MyCarousel from "../../component/MyCarousel";
import ProductListingWrapper from "../product/list/ProductListingWrapper";
import WorkSection from "../../MyComponent/WorkSection";
import HowHelpSection from "../../MyComponent/HowHelpSection";
import AboutSection from "../../MyComponent/AboutSection";
import HowWeWork from "../../MyComponent/howWeWork";
const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <MyCarousel />

      {/* Hero Section */}
      <section className="bg-blue-100 py-16 px-4">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4">
              Welcome to Acharya Vidhyasagar Foundation
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Get your stationery essentials at unbeatable prices. Perfect for
              students, artists & offices.
            </p>
            <Link
              to="/discounted-stationery"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Shop Now
            </Link>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="./images/EcoFriendly-_Custom_Printed-Spiral_Notebook_1.webp"
              alt="Stationery"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>
      {/* Work Section */}
      <WorkSection />
      {/* <ProductListingWrapper /> */}
      <HowHelpSection />
      <HowWeWork />
      <AboutSection />

      {/* Features Section */}
      {/* <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-800 mb-10">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Affordable Prices",
                desc: "Best deals for notebooks, pens, art supplies and more.",
              },
              {
                title: "High Quality",
                desc: "We source premium products to ensure top quality.",
              },
              {
                title: "Fast Delivery",
                desc: "Quick shipping to your doorstep with secure packaging.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-700">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-12 px-4 bg-blue-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Start Shopping Today!
          </h2>
          <p className="text-base sm:text-lg mb-6">
            Browse our latest collections of school & office essentials.
          </p>
          <Link
            to="/product"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
          >
            View Products
          </Link>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
