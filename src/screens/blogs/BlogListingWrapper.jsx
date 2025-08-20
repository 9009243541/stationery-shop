// import React from "react";
// import BlogListing from "./BlogListing";
// import { useGetAllBlogsQuery } from "../../slice/BlogApiSlice";

// const BlogListingWrapper = () => {
//   const { data, isLoading, isError } = useGetAllBlogsQuery();
//   console.log(data, "data");
// const blogs =
//   data?.data?.map((blog) => ({
//     id: blog._id,
//     title: blog.title,
//     author: blog.author,
//     category: blog.category || "General",
//     description: blog.description,
//     image:
//       blog.image && blog.image.trim() !== ""
//         ? `https://stationery-shop-backend-y2lb.onrender.com/uploads/${blog.image}`
//         : null,
//     video:
//       blog.video && blog.video.trim() !== ""
//         ? `https://stationery-shop-backend-y2lb.onrender.com/uploads/${blog.video}`
//         : null,
//     date: blog.createdAt,
//   })) || [];

//   if (isLoading) {
//     return <p className="text-center py-5">Loading blogs...</p>;
//   }

//   if (isError) {
//     return (
//       <p className="text-center text-red-500 py-5">Failed to load blogs</p>
//     );
//   }

//   return (
//     <div className="p-4">
//       <BlogListing blogs={blogs} />
//     </div>
//   );
// };

// export default BlogListingWrapper;
import React, { useEffect, useState } from "react";
import axios from "axios";
import AtmSkeleton from "../../component/atom/AtmSkeleton";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://stationery-shop-backend-y2lb.onrender.com";
  const IMAGE_URL = `${BASE_URL}/uploads/`;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/gallery/get-all`);
        if (res.data.status) {
          setImages(res.data.data);
        } else {
          console.error("Unexpected response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Our Gallery
      </h2>

      {loading ? (
        // Skeleton Grid Loader
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow-lg"
            >
              {/* Image Skeleton */}
              <AtmSkeleton variant="rect" width="100%" height="224px" />
            </div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((item) => (
            <div
              key={item._id}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={`${IMAGE_URL}${item.image}`}
                alt={item.description || "Gallery image"}
                className="w-full h-56 object-cover"
              />
              {/* Overlay on hover */}
              {item.description && (
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-4">
                  <p className="text-white text-center text-sm md:text-base font-medium">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
