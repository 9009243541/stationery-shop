import stationeryApiSlice from "../Service";

const UserAuthApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: (userId) => ({
        url: `user/profile/${userId}`,
        method: "GET",                                                                                                                                                                                                                                                                                                                                
      }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `user/update-user/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useUpdateUserMutation,
} = UserAuthApiSlice;
export default UserAuthApiSlice;
