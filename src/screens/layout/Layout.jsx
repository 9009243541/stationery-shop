import React from "react";

import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import SecondaryNavbar from "../navbar/SecondaryNavbar";
import CategoryHighlights from "../navbar/CategoryHighlights";

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <SecondaryNavbar />
      <CategoryHighlights />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
