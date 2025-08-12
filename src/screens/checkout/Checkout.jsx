import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Leaflet marker images using ES module syntax
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Checkout = ({
  formData,
  orderSummary,
  totalAmount,
  loading,
  handleChange,
  handlePlaceOrder,
  setFormData,
}) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  // Automatically get current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latlng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(latlng);
          setFormData((prev) => ({
            ...prev,
            latitude: latlng.lat,
            longitude: latlng.lng,
          }));
        },
        (err) => {
          toast.warn("⚠️ Location access denied or unavailable.");
          console.error(err);
        }
      );
    }
  }, [setFormData]);

  const ChangeMapView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) map.setView(center, 15);
    }, [center, map]);
    return null;
  };

  const handleMarkerDrag = (e) => {
    const newLatLng = e.target.getLatLng();
    setMarkerPosition(newLatLng);
    setFormData((prev) => ({
      ...prev,
      latitude: newLatLng.lat,
      longitude: newLatLng.lng,
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Checkout</h2>

      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-700">Order Summary</h3>
        {orderSummary.length > 0 ? (
          <ul className="space-y-2 mb-4 text-gray-600">
            {orderSummary.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <span className="font-medium text-gray-800">
                  {item.product?.name}
                </span>{" "}
                × {item.quantity} — ₹{item.product?.rate * item.quantity}
              </li>
            ))}
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
        <label className="block mb-2 text-gray-700 font-medium">
          Select Your Location
        </label>
        <MapContainer
          center={markerPosition || [28.6139, 77.209]}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeMapView center={markerPosition} />
          {markerPosition && (
            <Marker
              position={markerPosition}
              draggable={true}
              eventHandlers={{
                dragend: handleMarkerDrag,
              }}
            />
          )}
        </MapContainer>

        {formData.latitude && formData.longitude && (
          <p className="mt-2 text-green-600">
            📍 Lat: {formData.latitude}, Lng: {formData.longitude}
          </p>
        )}

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full mt-4 p-3 rounded-md text-white font-medium transition duration-300 ${
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
