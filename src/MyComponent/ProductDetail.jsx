// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const token = localStorage.getItem("token");
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   // Fetch product details
//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(
//         `https://your-api-url.com/product/${productId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProduct(res.data.product);
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [productId]);

//   const handleAddToCart = async () => {
//     try {
//       await axios.post(
//         `https://your-api-url.com/cart/add/${productId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Product added to cart!");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       navigate("/login");
//       alert("Failed to add to cart please login first.");
//     }
//   };

//   if (loading) return <p>Loading product...</p>;
//   if (!product) return <p>Product not found.</p>;

//   return (
//     <div className="container my-4">
//       <div className="row">
//         <div className="col-md-6">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="img-fluid rounded shadow"
//             style={{ maxHeight: "500px", objectFit: "cover" }}
//           />
//         </div>
//         <div className="col-md-6">
//           <h2>{product.name}</h2>
//           <h4 className="text-muted">₹{product.price.toFixed(2)}</h4>
//           <p className="mt-3">{product.description}</p>
//           <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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
      // SweetAlert2 पॉपअप दिखाएँ
      Swal.fire({
        title: "Added to Cart!",
        text: `${product.name} has been added to your cart.`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Go to Cart",
        cancelButtonText: "Continue Shopping",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#555",
        position: "center", // अलर्ट को सेंटर में दिखाएँ
        timer: 5000, // 5 सेकंड बाद ऑटो-क्लोज़ (ऑप्शनल)
        timerProgressBar: true, // प्रोग्रेस बार दिखाएँ (ऑप्शनल)
      }).then((result) => {
        if (result.isConfirmed) {
          // "Go to Cart" पर क्लिक करने पर कार्ट पेज पर रीडायरेक्ट
          navigate("/cart");
        }
        // "Continue Shopping" पर क्लिक करने पर अलर्ट बंद होगा
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      // अगर API कॉल फेल हो (जैसे टोकन नहीं है), तो लॉगिन पेज पर रीडायरेक्ट
      Swal.fire({
        title: "Error!",
        text: "Failed to add to cart. Please login first.",
        icon: "error",
        confirmButtonText: "Go to Login",
        position: "center",
      }).then(() => {
        navigate("/login");
      });
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