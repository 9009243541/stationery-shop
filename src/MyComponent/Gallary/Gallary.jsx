import React, { useEffect, useState } from "react";
import axios from "axios";
import AtmSkeleton from "../../component/atom/AtmSkeleton";

const Gallery = () => {
  const [media, setMedia] = useState([]); // all media (images + videos)
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("images"); // default: show images

  const BASE_URL = "https://stationery-shop-backend-y2lb.onrender.com";
  const MEDIA_URL = `${BASE_URL}/uploads/`;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/gallery/get-all`);
        if (res.data.status) {
          setMedia(res.data.data);
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

  // separate images and videos
  const images = media.filter((item) =>
    item.image?.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );
  const videos = media.filter((item) =>
    item.image?.match(/\.(mp4|webm|ogg|mov)$/i)
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Our Gallery
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("images")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "images"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "videos"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Videos
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow-lg"
            >
              <AtmSkeleton variant="rect" width="100%" height="224px" />
            </div>
          ))}
        </div>
      ) : activeTab === "images" ? (
        images.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No images found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {images.map((item) => (
              <div
                key={item._id}
                className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={`${MEDIA_URL}${item.image}`}
                  alt={item.description || "Gallery image"}
                  className="w-full h-56 object-cover"
                />
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
        )
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((item) => (
            <div
              key={item._id}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <video
                controls
                className="w-full h-56 object-cover"
                src={`${MEDIA_URL}${item.image}`}
              />
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
