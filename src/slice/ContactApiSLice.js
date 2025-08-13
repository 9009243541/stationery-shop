import stationeryApiSlice from "../Service";

const ContactApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation({
      query: (data) => ({
        url: "contact/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),
  }),
});
export const { useSendContactMessageMutation } = ContactApiSlice;

export default ContactApiSlice;
