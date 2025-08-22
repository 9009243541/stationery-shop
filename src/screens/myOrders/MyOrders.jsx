import React from "react";
import { useGetMyOrdersQuery } from "../../slice/OrderApiSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) return <p className="text-center py-10">Loading orders...</p>;
  if (isError)
    return <p className="text-center text-red-500">Something went wrong!</p>;

  // const handleDownloadBill = async (orderId) => {
  //   try {
  //     // Replace with your actual bill API endpoint (e.g., returns PDF blob)
  //     const response = await fetch(`http://localhost:3300/order/${orderId}/bill`);
  //     if (!response.ok) throw new Error('Failed to fetch bill');
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `bill_${orderId}.pdf`;
  //     link.click();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error downloading bill:', error);
  //     alert('Failed to download bill. Please try again.');
  //   }
  // };
  const handleDownloadBill = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3300/bill/generate-bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId,
          paymentMode: "cash", // Replace with dynamic value if needed
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate bill");
      }

      const result = await response.json();
      toast.success(
        "Bill generated successfully! Please check your email for the PDF invoice."
      );
    } catch (error) {
      console.error("Error generating bill:", error);
      toast.error(`Failed to generate bill: ${error.message}`);
    }
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {data?.data?.length === 0 && (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}

      <div className="space-y-6">
        {data?.data?.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Custom Tailwind Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
              <div className="mb-4">
                <p className="font-semibold">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
                <p className="text-sm text-gray-500">
                  Address: {order.deliveryAddress}
                </p>
                <p className="text-sm text-gray-500">
                  Total Products: {order.products.length}
                </p>
              </div>

              {/* Download Bill Button - Aligned right on md+ screens */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleDownloadBill(order._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Download Bill
                </button>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.products.map((p) => {
                  console.log("🛒 Product Item:", p); // Debug log remains for checking product data

                  return (
                    <div
                      key={p._id}
                      className="flex items-center gap-4 border p-3 rounded-xl shadow hover:shadow-md transition"
                    >
                      {/* Product image with fallback */}
                      <img
                        src={
                          p.productId?.image
                            ? `https://stationery-shop-backend-y2lb.onrender.com/uploads/${p.productId.image}`
                            : "https://via.placeholder.com/64?text=No+Image" // Fallback placeholder
                        }
                        alt={p.productId?.productName || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />
                      {/* Product details */}
                      <div>
                        <p className="font-medium">
                          {p.productId?.productName || "Unknown Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {p.quantity}
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
    </div>
  );
};

export default MyOrders;
