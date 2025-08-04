import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stationeryApiSlice = createApi({
  reducerPath: "Av-In",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Otp", "User", "Product", "Wishlist", "Cart"],
  endpoints: () => ({}),
});
export default stationeryApiSlice;
