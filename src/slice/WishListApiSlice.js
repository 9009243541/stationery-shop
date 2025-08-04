import stationeryApiSlice from "../Service";

const WishListApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "wishlist/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
    removeFromWishlist: builder.mutation({
      query: (data) => ({
        url: "wishlist/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
    getWishlist: builder.query({
      query: (userId) => ({
        url: `wishlist/get/${userId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
    deleteWishlist: builder.mutation({
      query: (userId) => ({
        url: `wishlist/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
  useDeleteWishlistMutation,
} = WishListApiSlice;

export default WishListApiSlice;
