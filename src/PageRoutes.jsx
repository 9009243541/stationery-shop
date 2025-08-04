import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeListWrapper from "./screens/home/HomeListWrapper";

import Layout from "./screens/layout/Layout";
import ProductListingWrapper from "./screens/product/list/ProductListingWrapper";
import AboutUs from "./screens/about/AboutUs";
import Contact from "./screens/contact/Contact";
import CartListWrapper from "./screens/cart/list/CartListWrapper";
import CategoryListWrapper from "./screens/category/list/CategoryListWrapper";
import UserLoginWrapper from "./screens/users/UserLogin/UserLoginWrapper";
import OtpWithEmailWrapper from "./screens/otpWithEmail/OtpWithEmailWrapper";
import UserNavigate from "./screens/users/UserNavigate";
import UserRegisterWrapper from "./screens/users/UserRegister/UserRegisterWrapper";
import UserProfileWrapper from "./screens/users/UserProfile/UserProfileWrapper";
import OtpWithPhoneWrapper from "./screens/otpWithPhone/OtpWithPhoneWrapper";
import EditUserProfileWrapper from "./screens/users/EditUser/EditUserProfileWrapper";
import Wishlist from "./MyComponent/Wishlist"; // Assuming this is the wishlist component
// import ProductDetail from "./MyComponent/ProductDetails"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomeListWrapper /> },
      { path: "/product", element: <ProductListingWrapper /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <CartListWrapper /> },
      { path: "/category", element: <CategoryListWrapper /> },
      { path: "/wishlist", element:  <Wishlist />}, 
      // Assuming wishlist uses the same component
    ],
  },
  { path: "/user", element: <UserNavigate /> },
  { path: "/update-user/:userId", element: <EditUserProfileWrapper /> },
  { path: "/otp", element: <OtpWithEmailWrapper /> },
  // { path: "/otp", element: <OtpWithPhoneWrapper /> },
  { path: "/register", element: <UserRegisterWrapper /> },
  { path: "/login", element: <UserLoginWrapper /> },
  { path: "/user-profile", element: <UserProfileWrapper /> },
]);
const PageRoutes = () => {
  return <RouterProvider router={router} />;
};

export default PageRoutes;
