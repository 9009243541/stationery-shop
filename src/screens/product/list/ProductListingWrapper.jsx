<<<<<<< Updated upstream
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
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
>>>>>>> Stashed changes
import ProductListing from "./ProductListing";
import { useGetAllProductsQuery } from "../../../slice/ProductApiSlice";

const ProductListingWrapper = () => {
<<<<<<< Updated upstream
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
=======
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]); // Filtered data after search
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/products`);
      setProducts(res.data || []);
      setFiltered(res.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Search filter
  useEffect(() => {
    const filteredData = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1); // Reset to page 1 on new search
  }, [search, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      fetchProducts(); // Refetch after delete
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search products..."
        className="mb-4 p-2 border rounded w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductListing products={currentItems} onDelete={handleDelete} />
      )}

      {/* Pagination controls */}
      <div className="flex gap-2 justify-center mt-6">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default ProductListingWrapper;
