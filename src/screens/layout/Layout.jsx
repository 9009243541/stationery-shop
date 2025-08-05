import React from "react";

import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import SecondaryNavbar from "../navbar/SecondaryNavbar";
import CategoryHighlights from "../navbar/CategoryHighlights";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <SecondaryNavbar />
      <CategoryHighlights />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
