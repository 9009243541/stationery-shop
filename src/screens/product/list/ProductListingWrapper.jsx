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

  return (
    <div className="p-4">
      <ProductListing products={products} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default ProductListingWrapper;