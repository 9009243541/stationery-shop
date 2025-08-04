import stationeryApiSlice from "../Service";

const CartApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "cart/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "cart/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateCartQuantity: builder.mutation({
      query: (data) => ({
        url: "cart/update-quantity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    getCart: builder.query({
      query: (userId) => ({
        url: `cart/get/${userId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteCart: builder.mutation({
      query: (userId) => ({
        url: `cart/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useGetCartQuery,
  useDeleteCartMutation,
} = CartApiSlice;

export default CartApiSlice;