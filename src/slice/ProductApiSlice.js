import stationeryApiSlice from "../Service";

const ProductApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "products/add-product",
        method: "POST",
        body: data,
      }),
    }),
    getAllProducts: builder.query({
      query: (userId) => ({
        url: `products/getproducts`,
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    updateProducts: builder.mutation({
      query: ({ productId, data }) => ({
        url: `products/update-product/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useUpdateProductsMutation,
} = ProductApiSlice;
export default ProductApiSlice;
