import stationeryApiSlice from "../Service";

const OrderApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get all orders for logged-in user
    getMyOrders: builder.query({
      query: () => ({
        url: "order/my-orders",
        method: "GET",
      }),
      providesTags: [{ type: "Order", id: "LIST" }],
    }),

    // 🔹 Place new order
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "order/place-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),

    // 🔹 Get single order by id
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `order/${orderId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
} = OrderApiSlice;

export default OrderApiSlice;
