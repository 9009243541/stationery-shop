// import React, { useState } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Default marker fix for leaflet
// const markerIcon = new L.Icon({
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const LocationMarker = ({ setLocation }) => {
//   const [position, setPosition] = useState(null);

//   useMapEvents({
//     click(e) {
//       setPosition(e.latlng);
//       setLocation({
//         latitude: e.latlng.lat.toFixed(6),
//         longitude: e.latlng.lng.toFixed(6),
//       });
//     },
//   });

//   return position ? <Marker position={position} icon={markerIcon} /> : null;
// };

// const Checkout = ({
//   formData,
//   orderSummary,
//   totalAmount,
//   loading,
//   handleChange,
//   handlePlaceOrder,
//   setFormData, // Parent se aayega
// }) => {
//   const calculateDiscountedPrice = (mrp, discount) => {
//     return mrp * (1 - discount / 100);
//   };

//   const handleLocationSelect = (loc) => {
//     setFormData({
//       ...formData,
//       latitude: loc.latitude,
//       longitude: loc.longitude,
//     });
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//       <ToastContainer />
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Checkout</h2>

//       {/* Order Summary */}
//       <div>
//         <h3 className="text-lg font-medium mb-2 text-gray-700">
//           Order Summary
//         </h3>
//         {orderSummary.length > 0 ? (
//           <ul className="space-y-2 mb-4 text-gray-600">
//             {orderSummary.map((item, index) => {
//               const discountedPrice = calculateDiscountedPrice(
//                 item.product.mrp,
//                 item.product.discount
//               ).toFixed(2);
//               const totalItemPrice = (discountedPrice * item.quantity).toFixed(
//                 2
//               );

//               return (
//                 <li key={index} className="border-b pb-2">
//                   <span className="font-medium text-gray-800">
//                     {item.product?.productName}
//                   </span>{" "}
//                   × {item.quantity}
//                   <p className="text-sm text-gray-600">
//                     Original Price: ₹{item.product?.mrp} | Discount:{" "}
//                     {item.product?.discount}% | Price after Discount: ₹
//                     {discountedPrice}
//                   </p>
//                   <p className="text-sm font-semibold text-gray-800">
//                     Item Total: ₹{totalItemPrice}
//                   </p>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p className="text-sm text-gray-500">No items in cart.</p>
//         )}
//         <div className="text-right font-bold text-gray-800 mb-6">
//           Total: ₹{totalAmount}
//         </div>
//       </div>

//       {/* Shipping Info */}
//       <div>
//         <h3 className="text-lg font-medium mb-3 text-gray-700">
//           Shipping Info
//         </h3>

//         <input
//           type="text"
//           name="deliveryAddress"
//           placeholder="Delivery Address"
//           value={formData.deliveryAddress}
//           onChange={handleChange}
//           required
//           className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//           className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Map Picker */}
//         <h4 className="mb-2 font-medium text-gray-700">Select Location</h4>
//         <MapContainer
//           center={[20.5937, 78.9629]} // Default India
//           zoom={5}
//           style={{ height: "300px", width: "100%", marginBottom: "1rem" }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <LocationMarker setLocation={handleLocationSelect} />
//         </MapContainer>

//         {/* Show Selected Coordinates */}
//         <div className="flex gap-4 mb-4">
//           {/* <input
//             type="text"
//             name="latitude"
//             placeholder="Latitude"
//             value={formData.latitude}
//             readOnly
//             className="w-1/2 p-3 border border-gray-300 rounded-md"
//           />
//           <input
//             type="text"
//             name="longitude"
//             placeholder="Longitude"
//             value={formData.longitude}
//             readOnly
//             className="w-1/2 p-3 border border-gray-300 rounded-md"
//           /> */}
//           <input type="hidden" name="latitude" value={formData.latitude} />
//           <input type="hidden" name="longitude" value={formData.longitude} />
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className={`w-full p-3 rounded-md text-white font-medium transition duration-300 ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-700"
//           }`}
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;\



















import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { jwtDecode } from "jwt-decode";
import { useGetUserProfileQuery } from "../../slice/UserAuthApiSlice";
 // path adjust karo

// Marker icon fix
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Map marker component
const LocationMarker = ({ setLocation }) => {
  const [position, setPosition] = React.useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation({
        latitude: e.latlng.lat.toFixed(6),
        longitude: e.latlng.lng.toFixed(6),
      });
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
};

const Checkout = ({
  formData,
  orderSummary,
  totalAmount,
  loading,
  handleChange,
  handlePlaceOrder,
  setFormData,
}) => {
  // 🔹 Decode token to get userId
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded._id;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  // 🔹 Fetch user profile
  const { data, isSuccess } = useGetUserProfileQuery(userId, { skip: !userId });

  // 🔹 Prefill form when user data is fetched
  useEffect(() => {
    if (isSuccess && data?.data) {
      const { address, email, mobile } = data.data;
      setFormData((prev) => ({
        ...prev,
        deliveryAddress: address || "",
        email: email || "",
        phone: mobile || "",
      }));
    }
  }, [isSuccess, data, setFormData]);

  // Price calculation helper
  const calculateDiscountedPrice = (mrp, discount) =>
    mrp * (1 - discount / 100);

  const handleLocationSelect = (loc) => {
    setFormData((prev) => ({
      ...prev,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-gray-800"></h2>

      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-700">Order Summary</h3>
        {orderSummary.length > 0 ? (
          <ul className="space-y-2 mb-4 text-gray-600">
            {orderSummary.map((item, index) => {
              const discountedPrice = calculateDiscountedPrice(
                item.product.mrp,
                item.product.discount
              ).toFixed(2);
              const totalItemPrice = (discountedPrice * item.quantity).toFixed(2);

              return (
                <li key={index} className="border-b pb-2">
                  <span className="font-medium text-gray-800">
                    {item.product?.productName}
                  </span>{" "}
                  × {item.quantity}
                  <p className="text-sm text-gray-600">
                    Original Price: ₹{item.product?.mrp} | Discount:{" "}
                    {item.product?.discount}% | Price after Discount: ₹
                    {discountedPrice}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    Item Total: ₹{totalItemPrice}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No items in cart.</p>
        )}
        <div className="text-right font-bold text-gray-800 mb-6">
          Total: ₹{totalAmount}
        </div>
      </div>

      {/* Shipping Info */}
      <div>
        <h3 className="text-lg font-medium mb-3 text-gray-700">Shipping Info</h3>

        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Map Picker */}
        <h4 className="mb-2 font-medium text-gray-700">Select Location</h4>
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "300px", width: "100%", marginBottom: "1rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker setLocation={handleLocationSelect} />
        </MapContainer>

        <input type="hidden" name="latitude" value={formData.latitude} />
        <input type="hidden" name="longitude" value={formData.longitude} />

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full p-3 rounded-md text-white font-medium transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
