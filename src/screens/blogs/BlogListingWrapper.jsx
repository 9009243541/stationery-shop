import React from "react";
import BlogListing from "./BlogListing";
import { useGetAllBlogsQuery } from "../../slice/BlogApiSlice";

const BlogListingWrapper = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery();
  console.log(data, "data");
const blogs =
  data?.data?.map((blog) => ({
    id: blog._id,
    title: blog.title,
    author: blog.author,
    category: blog.category || "General",
    description: blog.description,
    image:
      blog.image && blog.image.trim() !== ""
        ? `https://stationery-shop-backend-y2lb.onrender.com/uploads/${blog.image}`
        : null,
    video:
      blog.video && blog.video.trim() !== ""
        ? `https://stationery-shop-backend-y2lb.onrender.com/uploads/${blog.video}`
        : null,
    date: blog.createdAt,
  })) || [];

  if (isLoading) {
    return <p className="text-center py-5">Loading blogs...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-5">Failed to load blogs</p>
    );
  }

  return (
    <div className="p-4">
      <BlogListing blogs={blogs} />
    </div>
  );
};

export default BlogListingWrapper;
