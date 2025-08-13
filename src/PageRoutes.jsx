import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeListWrapper from "./screens/home/HomeListWrapper";

import Layout from "./screens/layout/Layout";
import ProductListingWrapper from "./screens/product/list/ProductListingWrapper";
import AboutUs from "./screens/about/AboutUs";
import CartListWrapper from "./screens/cart/list/CartListWrapper";
import CategoryListWrapper from "./screens/category/list/CategoryListWrapper";
import UserLoginWrapper from "./screens/users/UserLogin/UserLoginWrapper";
import OtpWithEmailWrapper from "./screens/otpWithEmail/OtpWithEmailWrapper";
import UserNavigate from "./screens/users/UserNavigate";
import UserRegisterWrapper from "./screens/users/UserRegister/UserRegisterWrapper";
import UserProfileWrapper from "./screens/users/UserProfile/UserProfileWrapper";
// import OtpWithPhoneWrapper from "./screens/otpWithPhone/OtpWithPhoneWrapper";
import EditUserProfileWrapper from "./screens/users/EditUser/EditUserProfileWrapper";
import Wishlist from "./MyComponent/Wishlist"; // Assuming this is the wishlist component
// import ProductDetail from "./MyComponent/ProductDetails";

import FreeCopyDistribution from "./FreeCopyDistribution/FreeCopyDistribution";
// Assuming this is the FreeCopyDistribution component

import StationaryHome from "./Stationary/StationaryHome";
import Checkout from "./screens/checkout/Checkout";
import ThankYou from "./screens/thank-you/ThankYou";
import CheckoutWrapper from "./screens/checkout/CheckoutWrapper";
import NotFound from "./component/NotFound";
import Gallary from "./MyComponent/Gallary/Gallary"; // Importing the Gallery component
import ImpactReport from "./MyComponent/ImpactReport/ImpactReport"; // Importing the ImpactReport component
import OurReachWrapper from "./screens/ourReach/OurReachWrapper";
import BlogListingWrapper from "./screens/blogs/BlogListingWrapper";
import ContactWrapper from "./screens/contact/ContactWrapper";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomeListWrapper /> },
      {
        path: "/discounted-stationery/product",
        element: <ProductListingWrapper />,
      },

      { path: "/about", element: <AboutUs /> },
      { path: "/galary", element: <Gallary /> },
      { path: "/blogs", element: <BlogListingWrapper /> },
      { path: "/our-reach", element: <OurReachWrapper /> },
      { path: "/impact-reports", element: <ImpactReport /> },
      { path: "/contact", element: <ContactWrapper /> },
      { path: "/discounted-stationery/cart", element: <CartListWrapper /> },
      {
        path: "/discounted-stationery/category",
        element: <CategoryListWrapper />,
      },
      { path: "/discounted-stationery/wishlist", element: <Wishlist /> },
      { path: "/discounted-stationery", element: <StationaryHome /> },
      { path: "/discounted-stationery/checkout", element: <CheckoutWrapper /> },
      { path: "/thank-you", element: <ThankYou /> },
      { path: "/discounted-stationery/checkout", element: <Checkout /> },

      { path: "/free-distribution", element: <FreeCopyDistribution /> },
      { path: "*", element: <NotFound /> },
      // Added route for OurReach component
    ],
  },
  { path: "/user", element: <UserNavigate /> },
  { path: "/update-user/:userId", element: <EditUserProfileWrapper /> },
  { path: "/otp", element: <OtpWithEmailWrapper /> },
  // { path: "/otp", element: <OtpWithPhoneWrapper /> },
  { path: "/register", element: <UserRegisterWrapper /> },
  { path: "/login", element: <UserLoginWrapper /> },
  { path: "/user-profile", element: <UserProfileWrapper /> },
  { path: "*", element: <NotFound /> },
]);
const PageRoutes = () => {
  return <RouterProvider router={router} />;
};

export default PageRoutes;
