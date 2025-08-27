// import React from "react";
// import { useGetMyOrdersQuery } from "../../slice/OrderApiSlice";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// const MyOrders = () => {
//   const { data, isLoading, isError } = useGetMyOrdersQuery();
//   console.log(data, "data");
//   if (isLoading) return <p className="text-center py-10">Loading orders...</p>;
//   if (isError)
//     return <p className="text-center text-red-500">Something went wrong!</p>;

//   // const handleDownloadBill = async (orderId) => {
//   //   try {
//   //     // Replace with your actual bill API endpoint (e.g., returns PDF blob)
//   //     const response = await fetch(`http://localhost:3300/order/${orderId}/bill`);
//   //     if (!response.ok) throw new Error('Failed to fetch bill');
//   //     const blob = await response.blob();
//   //     const url = window.URL.createObjectURL(blob);
//   //     const link = document.createElement('a');
//   //     link.href = url;
//   //     link.download = `bill_${orderId}.pdf`;
//   //     link.click();
//   //     window.URL.revokeObjectURL(url);
//   //   } catch (error) {
//   //     console.error('Error downloading bill:', error);
//   //     alert('Failed to download bill. Please try again.');
//   //   }
//   // };
//   const handleDownloadBill = async (orderId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:3300/bill/generate-bill", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//               "x-access-token": token,
//         },
//         body: JSON.stringify({
//           orderId,
//           paymentMode: "cash", // Replace with dynamic value if needed
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to generate bill");
//       }

//       const result = await response.json();
//       toast.success(
//         "Bill generated successfully! Please check your email for the PDF invoice."
//       );
//     } catch (error) {
//       console.error("Error generating bill:", error);
//       toast.error(`Failed to generate bill: ${error.message}`);
//     }
//   };
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//       {data?.data?.length === 0 && (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       )}

//       <div className="space-y-6">
//         {data?.data?.map((order, index) => (
//           <motion.div
//             key={order._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             {/* Custom Tailwind Card */}
//             <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
//               <div className="mb-4">
//                 <p className="font-semibold">
//                   Order ID: <span className="text-gray-600">{order._id}</span>
//                 </p>
//                 <p className="text-sm text-gray-500">Status: {order.status}</p>
//                 <p className="text-sm text-gray-500">
//                   Address: {order.deliveryAddress}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Total Products: {order.products.length}
//                 </p>
//               </div>

//               {/* Download Bill Button - Aligned right on md+ screens */}
//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => handleDownloadBill(order._id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                 >
//                   Download Bill
//                 </button>
//               </div>

//               {/* Products */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {order.products.map((p) => {
//                   console.log("🛒 Product Item:", p); // Debug log remains for checking product data

//                   return (
//                     <div
//                       key={p._id}
//                       className="flex items-center gap-4 border p-3 rounded-xl shadow hover:shadow-md transition"
//                     >
//                       {/* Product image with fallback */}
//                       <img
//                         src={
//                           p.productId?.image
//                             ? `https://stationery-shop-backend-y2lb.onrender.com/uploads/${p.productId.image}`
//                             : "https://via.placeholder.com/64?text=No+Image" // Fallback placeholder
//                         }
//                         alt={p.productId?.productName || "Product"}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       {/* Product details */}
//                       <div>
//                         <p className="font-medium">
//                           {p.productId?.productName || "Unknown Product"}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Quantity: {p.quantity}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

/// second code
import React, { useState } from "react";
import { useGetMyOrdersQuery } from "../../slice/OrderApiSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { IconFileDownload } from "@tabler/icons-react";

const MyOrders = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery();
  const [selectedBillUrl, setSelectedBillUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  console.log("📦 Orders Data:", JSON.stringify(data, null, 2));

  if (isLoading)
    return <p className="text-center py-10 text-gray-600">Loading orders...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load orders. Please try again.
      </p>
    );
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const handleDownloadBill = async (orderId) => {
    try {
      setLoadingStates((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], download: true },
      }));
      const token = localStorage.getItem("token");
      console.log("🔐 Token for download:", token);
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
      const response = await fetch(
        `${BASE_URL}/bill/generate-bill?returnBlob=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-access-token": token,
          },
          body: JSON.stringify({
            orderId,
            paymentMode: "cash", // Update dynamically if needed
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate bill");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bill_${orderId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("Bill downloaded successfully!");
    } catch (error) {
      console.error(`Error downloading bill for order ${orderId}:`, error);
      toast.error(`Failed to download bill: ${error.message}`);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], download: false },
      }));
    }
  };

  const handleViewBill = async (orderId) => {
    try {
      setLoadingStates((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], view: true },
      }));
      const token = localStorage.getItem("token");
      console.log("🔐 Token for view:", token);
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(
        `${BASE_URL}/bill/generate-bill?returnImage=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-access-token": token,
          },
          body: JSON.stringify({
            orderId,
            paymentMode: "cash", // Update dynamically if needed
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate bill image");
      }

      const result = await response.json();
      if (!result.data?.imageUrl) {
        throw new Error("Bill image URL not provided");
      }

      setSelectedBillUrl(result.data.imageUrl);
      setIsModalOpen(true);
      toast.success("Bill image loaded successfully!");
    } catch (error) {
      console.error(`Error viewing bill for order ${orderId}:`, error);
      toast.error(`Failed to view bill: ${error.message}`);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], view: false },
      }));
    }
  };

  const closeModal = () => {
    setSelectedBillUrl(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

      {data?.data?.length === 0 && (
        <p className="text-gray-500 text-center py-10">No orders found.</p>
      )}

      <div className="space-y-6">
        {data?.data?.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
              <div className="mb-4">
                <p className="font-semibold text-gray-700">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
                <p className="text-sm text-gray-500">
                  Address: {order.deliveryAddress}
                </p>
                <p className="text-sm text-gray-500">
                  Total Products: {order.products.length}
                </p>
                <p className="text-sm text-gray-500">
                  Total Amount: ₹{order.totalAmount?.toFixed(2) || "0.00"}
                </p>
              </div>

              <div className="flex justify-end mb-4 space-x-4">
                <button
                  onClick={() => handleViewBill(order._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:bg-green-300 flex items-center"
                  disabled={loadingStates[order._id]?.view}
                >
                  {loadingStates[order._id]?.view ? "Loading..." : "View Bill"}
                </button>
                <button
                  onClick={() => handleDownloadBill(order._id)}
                  className="text-blue-500 hover:text-blue-600 transition disabled:text-blue-300"
                  disabled={loadingStates[order._id]?.download}
                  title="Download Bill"
                >
                  <IconFileDownload className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.products.map((p) => {
                  console.log("🛒 Product Item:", JSON.stringify(p, null, 2));
                  const imageUrl = p.productId?.image
                    ? `https://stationery-shop-backend-y2lb.onrender.com/uploads/${p.productId.image}`
                    : "https://via.placeholder.com/64?text=No+Image";
                  console.log("🖼️ Product Image URL:", imageUrl);
                  return (
                    <div
                      key={p._id}
                      className="flex items-center gap-4 border p-3 rounded-xl shadow hover:shadow-md transition"
                    >
                      <img
                        src={imageUrl}
                        alt={p.productId?.productName || p.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                        onError={() =>
                          console.error("Failed to load image:", imageUrl)
                        }
                      />
                      <div>
                        <p className="font-medium text-gray-700">
                          {p.productId?.productName ||
                            p.name ||
                            "Unknown Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {p.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ₹{p.price?.toFixed(2) || "0.00"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total: ₹{p.total?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Order Bill
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            {selectedBillUrl ? (
              <img
                src={selectedBillUrl}
                alt="Order Bill"
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                onError={() => {
                  toast.error("Failed to load bill image");
                  closeModal();
                }}
              />
            ) : (
              <p className="text-center text-gray-500">Loading bill...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
