// src/redux/slices/ourReachApiSlice.js
import stationeryApiSlice from "../Service";

const OurReachApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOurReach: builder.query({
      query: () => ({
        url: "our-reach/get-all", // backend endpoint
        method: "GET",
      }),
      providesTags: [{ type: "OurReach", id: "LIST" }],
    }),
  }),
});

export const { useGetAllOurReachQuery } = OurReachApiSlice;

export default OurReachApiSlice;
