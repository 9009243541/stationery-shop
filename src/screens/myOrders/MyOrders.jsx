import React, { useState } from "react";
import { useGetMyOrdersQuery } from "../../slice/OrderApiSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { IconFileDownload } from "@tabler/icons-react";

const MyOrders = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery();
  const [loadingStates, setLoadingStates] = useState({});
  const [bills, setBills] = useState({}); // ✅ Add this
  const BASE_URL =
    import.meta.env.VITE_APP_BASE_URL ||
    "https://stationery-shop-backend-y2lb.onrender.com";

  if (isLoading)
    return <p className="text-center py-10 text-gray-600">Loading orders...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load orders. Please try again later.
      </p>
    );

  // ==============================
  // Create or get bill from backend
  // ==============================
  const createOrGetBill = async (order) => {
    if (bills[order._id]) return bills[order._id];

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to access bill");

      const response = await fetch(`${BASE_URL}/bill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: order._id,
          userId: order.userId?._id || order.userId,
          totalAmount: order.totalAmount,
          paymentMode: order.paymentMode || "cash",
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to create bill");
      }

      const billData = await response.json();
      setBills((prev) => ({ ...prev, [order._id]: billData.bill }));
      return billData.bill;
    } catch (err) {
      console.error(err);
      toast.error("Error generating bill: " + err.message);
      return null;
    }
  };

  // ==============================
  // View bill PDF using orderId
  // ==============================
  const handleViewBill = async (order) => {
    try {
      setLoadingStates((prev) => ({
        ...prev,
        [order._id]: { ...prev[order._id], view: true },
      }));

      // Ensure bill exists (optional)
      await createOrGetBill(order);

      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/bill/view-by-order/${order._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch bill PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Error viewing bill: " + err.message);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [order._id]: { ...prev[order._id], view: false },
      }));
    }
  };

  // ==============================
  // Send bill via email using orderId
  // ==============================
  const handleSendBillEmail = async (order) => {
    try {
      setLoadingStates((prev) => ({
        ...prev,
        [order._id]: { ...prev[order._id], download: true },
      }));

      // Ensure bill exists (optional)
      await createOrGetBill(order);

      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/bill/email-by-order/${order._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Bill sent to your registered email!");
      } else {
        throw new Error(result.message || "Failed to send bill");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending bill: " + err.message);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [order._id]: { ...prev[order._id], download: false },
      }));
    }
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

              {/* Action buttons */}
              <div className="flex justify-end mb-4 space-x-4">
                <button
                  onClick={() => handleViewBill(order)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center disabled:bg-green-300"
                  disabled={loadingStates[order._id]?.view}
                >
                  {loadingStates[order._id]?.view ? "Loading..." : "View Bill"}
                </button>

                <button
                  onClick={() => handleSendBillEmail(order)}
                  className="text-blue-500 hover:text-blue-600 transition disabled:text-blue-300 flex items-center"
                  disabled={loadingStates[order._id]?.download}
                  title="Send Bill to Email"
                >
                  <IconFileDownload className="w-6 h-6" />
                </button>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.products.map((p) => {
                  const imageUrl = p.productId?.image
                    ? `${BASE_URL}/uploads/${p.productId.image}?t=${Date.now()}`
                    : "https://via.placeholder.com/64?text=No+Image";
                  return (
                    <div
                      key={p._id}
                      className="flex items-center gap-4 border p-3 rounded-xl shadow hover:shadow-md transition"
                    >
                      <img
                        src={imageUrl}
                        alt={p.productId?.productName || p.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-700">
                          {p.productId?.productName || p.name || "Unknown Product"}
                        </p>
                        <p className="text-sm text-gray-500">Quantity: {p.quantity}</p>
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
    </div>
  );
};

export default MyOrders;
