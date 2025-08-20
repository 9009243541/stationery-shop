import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch product details
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://your-api-url.com/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(res.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
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
      navigate("/login");
      alert("Failed to add to cart please login first.");
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4 className="text-muted">₹{product.price.toFixed(2)}</h4>
          <p className="mt-3">{product.description}</p>
          <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
