import stationeryApiSlice from "../Service";

const BlogApiSlice = stationeryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "blogs/get-all",
        method: "GET",
      }),
      providesTags: [{ type: "Blog", id: "LIST" }],
    }),
  }),
});

export const { useGetAllBlogsQuery } = BlogApiSlice;

export default BlogApiSlice;
