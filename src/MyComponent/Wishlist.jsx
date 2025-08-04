import React, { useState } from 'react';
import { useGetWishlistQuery } from '../slice/WishListApiSlice';

const BASE_URL = 'https://tbtdj99v-3300.inc1.devtunnels.ms'; // ✅ Your backend base URL
const ITEMS_PER_PAGE = 8;

const Wishlist = () => {
  const { data, isLoading } = useGetWishlistQuery();
  const wishlistProducts = data?.data?.products || [];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(wishlistProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = wishlistProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddToCart = (productId) => {
    console.log('Add to cart:', productId);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <p className="text-center mt-4">Loading wishlist...</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">❤️ My Wishlist</h2>

      {wishlistProducts.length === 0 ? (
        <div className="text-center text-muted">No items in wishlist.</div>
      ) : (
        <>
          <div className="row g-4">
            {paginatedProducts.map((product) => {
              const imageUrl = product.image
                ? `${BASE_URL}/uploads/${product.image.replace(/\\/g, '/')}`
                : '/default-image.png';

              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
                  <div className="card h-100 border shadow-sm">
                    <img
                      src={imageUrl}
                      alt={product.productName}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-semibold">{product.productName}</h5>
                      <p className="card-text text-muted mb-2">
                        <del>₹{product.mrp}</del>{' '}
                        <span className="text-dark fw-bold ms-2">₹{product.rate}</span>
                      </p>
                      <p className="text-muted small">Brand: {product.brand}</p>
                      <button
                        className="btn btn-outline-primary mt-auto"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Wishlist;
