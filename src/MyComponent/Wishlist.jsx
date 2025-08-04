import React from "react";
import axios from "axios";
import { useGetWishlistQuery } from "../slice/WishListApiSlice";

const Wishlist = () => {
  const token = localStorage.getItem("token");
  const { data, error, isLoading } = useGetWishlistQuery();

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `https://your-api-url.com/cart/add/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  if (isLoading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error loading wishlist</p>;

  const wishlist = data?.products || [];

  return (
    <div className="container my-4">
      <h2 className="mb-3">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">
                    ₹{product.price?.toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
