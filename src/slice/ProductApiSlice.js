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
    // getAllProducts: builder.query({
    //   query: () => ({
    //     url: "products/getproducts",
    //     method: "GET",
    //   }),
    //   providesTags: [{ type: "Product", id: "LIST" }],
    // }),
    getAllProducts: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `products/getproducts?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    // getAllProducts: builder.query({
    //   query: ({ page = 1, limit = 10 }) => ({
    //     url: `products/getproducts?page=${page}&limit=${limit}`,
    //     method: "GET",
    //   }),
    //   serializeQueryArgs: ({ endpointName }) => {
    //     return endpointName; // ek hi cache key banega
    //   },
    //   merge: (currentCache, newItems) => {
    //     // purane data ke saath naya data merge karo
    //     currentCache.data.push(...newItems.data);
    //     currentCache.total = newItems.total;
    //   },
    //   forceRefetch({ currentArg, previousArg }) {
    //     return currentArg?.page !== previousArg?.page;
    //   },
    // }),

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
