import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'https://tbtdj99v-3300.inc1.devtunnels.ms';
  const IMAGE_URL = `${BASE_URL}/uploads/`;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/gallery/get-all`);
        if (res.data.status) {
          setImages(res.data.data);
        } else {
          console.error('Unexpected response:', res.data);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
   <div className="container py-5">
  <h2 className="text-center mb-4">Our Gallery</h2>

  {loading ? (
    <p className="text-center">Loading gallery...</p>
  ) : images.length === 0 ? (
    <p className="text-center">No images found.</p>
  ) : (
    <div className="row">
      {images.map((item) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
          <div className="card shadow-sm h-100">
            <img
              src={`${IMAGE_URL}${item.image}`}
              alt="Gallery"
              className="card-img-top"
              style={{ objectFit: 'cover', height: '200px' }}
            />
            {item.description && (
              <div className="card-body">
                <p className="card-text text-muted">{item.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default Gallery;
