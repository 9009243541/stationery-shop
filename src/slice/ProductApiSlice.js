import stationeryApiSlice from "../Service";

const ProductApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "products/add-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "products/getproducts",
        method: "GET",
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `products/update-product/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} = ProductApiSlice;

export default ProductApiSlice;
