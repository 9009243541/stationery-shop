import stationeryApiSlice from "../Service";

const OtpApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "otp/send",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "otp/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = OtpApiSlice;
export default OtpApiSlice;
