import React from "react";
import { useGetMyOrdersQuery } from "../../slice/OrderApiSlice";
import { motion } from "framer-motion";

const MyOrders = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) return <p className="text-center py-10">Loading orders...</p>;
  if (isError)
    return <p className="text-center text-red-500">Something went wrong!</p>;

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

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.products.map((p) => {
                  console.log("🛒 Product Item:", p); // 👈 yaha console hoga

                  return (
                    <div
                      key={p._id}
                      className="flex items-center gap-4 border p-3 rounded-xl shadow hover:shadow-md transition"
                    >
                      {/* product image */}
                      <img
                        src={`http://localhost:3300/uploads/${p.productId?.image}`}
                        alt={p.productId?.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      {/* product details */}
                      <div>
                        <p className="font-medium">
                          {p.productId?.productName}
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
