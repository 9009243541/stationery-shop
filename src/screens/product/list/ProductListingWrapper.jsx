import React, { useState } from "react";
import ProductListing from "./ProductListing";
import { useGetAllProductsQuery } from "../../../slice/ProductApiSlice";
import Pagination from "./Pagination";

const ProductListingWrapper = () => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, isError } = useGetAllProductsQuery({ page, limit });

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
      organizedBy: product.organizedBy,
      image:
        product.image && product.image.trim() !== ""
          ? `https://stationery-shop-backend-y2lb.onrender.com/uploads/${product.image}`
          : "https://via.placeholder.com/100x100.png?text=No+Image",
    })) || [];

  // ✅ Pagination from backend
  const total = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.pages || 1;

  return (
    <div className="p-4">
      <ProductListing
        products={products}
        isLoading={isLoading}
        isError={isError}
      />

      {/* ✅ Pagination Component */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProductListingWrapper;
