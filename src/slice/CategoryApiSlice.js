import stationeryApiSlice from "../Service";

const CategoryApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "categories/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `categories/update/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    getAllCategory: builder.query({
      query: () => ({
        url: "categories/getAllCategory",
        method: "GET",
      }),
      providesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} = CategoryApiSlice;

export default CategoryApiSlice;
