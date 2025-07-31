// import React, { useEffect, useState } from "react";
// import ProductListing from "./ProductListing";
// import { useGetAllProductsQuery } from "../../../slice/ProductApiSlice";

// const ProductListingWrapper = () => {
//   // const [products, setProducts] = useState([]);

//   // useEffect(() => {
//   //   // Sample data
//   //   const fetchedProducts = [
//   //     {
//   //       id: 1,
//   //       name: "Apsara Pencil",
//   //       price: 5,
//   //       image: "https://m.media-amazon.com/images/I/61ujOZmD35L.jpg",
//   //     },
//   //     {
//   //       id: 1,
//   //       name: "Apsara Pencil",
//   //       price: 5,
//   //       image: "https://m.media-amazon.com/images/I/61ujOZmD35L.jpg",
//   //     },
//   //     {
//   //       id: 1,
//   //       name: "Apsara Pencil",
//   //       price: 5,
//   //       image: "https://m.media-amazon.com/images/I/61ujOZmD35L.jpg",
//   //     },
//   //   ];
//   //   setProducts(fetchedProducts);
//   // }, []);
//   const handleDelete = (id) => {
//     const updatedList = products.filter((product) => product.id !== id);
//     setProducts(updatedList);
//   };

//   const { data, isLoading, isError } = useGetAllProductsQuery();
//   console.log(data,'data')
//   console.log(data?.data,'datadatatattatat')
//   // const navigate = useNavigate();

//   // const handleEdit = (productId) => {
//   //   navigate(`/edit-product/${productId}`);
//   // };

//   // const handleAddProduct = () => {
//   //   navigate("/add-product");
//   // };

//   // if (isLoading) {
//   //   return <AtmLoader />;
//   // }

//   // if (isError) {
//   //   return <p>Data fetching failed</p>;
//   // }
//   // const products = data?.data || [];

//   return (
//     <div className="p-4">
//       <ProductListing products={data?.data || []} onDelete={handleDelete} />
//     </div>
//   );
// };

// export default ProductListingWrapper;
import React from "react";
import ProductListing from "./ProductListing";
import { useGetAllProductsQuery } from "../../../slice/ProductApiSlice";

const ProductListingWrapper = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  const products =
    data?.data?.map((product) => ({
      id: product._id,
      name: product.productName,
      title: product.productTitle,
      price: product.mrp,
      discount: product.discount,
      category: product.category?.categoryname || "General",
      brand: product.brand,
      availability: product.availability,
      description: product.description,
      rating: product.rating,
      reviews: product.review,
      image:
        product.image && product.image.trim() !== ""
          ? `https://tbtdj99v-3300.inc1.devtunnels.ms/uploads/${product.image}` 
          : "https://via.placeholder.com/100x100.png?text=No+Image",
    })) || [];

  if (isLoading) {
    return <p className="text-center py-5">Loading products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-5">Failed to load products</p>
    );
  }

  return (
    <div className="p-4">
      <ProductListing products={products} />
    </div>
  );
};

export default ProductListingWrapper;
