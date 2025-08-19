import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { jwtDecode } from "jwt-decode";
import { useGetUserProfileQuery } from "../../slice/UserAuthApiSlice";

// Marker icon fix
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Map marker component
const LocationMarker = ({ setLocation, position }) => {
  const map = useMap();

  // Update map view when position changes
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 15);
    }
  }, [position, map]);

  // ✅ Attach click handler only once
  useEffect(() => {
    const handleClick = (e) => {
      setLocation({
        latitude: e.latlng.lat.toFixed(6),
        longitude: e.latlng.lng.toFixed(6),
      });
    };

    map.on("click", handleClick);

    // ✅ Cleanup listener when component unmounts or map changes
    return () => {
      map.off("click", handleClick);
    };
  }, [map, setLocation]);

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
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [position, setPosition] = useState(null);

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

  // 🔹 Reverse geocoding using LocationIQ
  const fetchAddress = async (latitude, longitude) => {
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${import.meta.env.VITE_APP_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      if (data && data.display_name) {
        return data.display_name;
      } else {
        toast.error("Could not fetch address. Please try again.");
        return "";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Error fetching address. Please try again.");
      return "";
    } finally {
      setIsGeocoding(false);
    }
  };
// 🔹 Reverse geocoding using LocationIQ (normal version for current location)


  // 🔹 Handle map location selection
  const handleLocationSelect = async (loc) => {
    setPosition({
      lat: parseFloat(loc.latitude),
      lng: parseFloat(loc.longitude),
    });
    const address = await fetchAddress(loc.latitude, loc.longitude);
    setFormData((prev) => ({
      ...prev,
      latitude: loc.latitude,
      longitude: loc.longitude,
      deliveryAddress: address || prev.deliveryAddress,
    }));
  };

  // 🔹 Fetch current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsGeocoding(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await fetchAddress(latitude, longitude);
          setPosition({ lat: latitude, lng: longitude });
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
            deliveryAddress: address || prev.deliveryAddress,
          }));
        },
        (error) => {
          toast.error(
            "Unable to retrieve your location. Please select manually."
          );
          console.error(error);
          setIsGeocoding(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  // 🔹 Initialize map with user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting initial location:", error);
        }
      );
    }
  }, []);

  // Price calculation helper
  const calculateDiscountedPrice = (mrp, discount) =>
    mrp * (1 - discount / 100);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Checkout</h2>

      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-700">
          Order Summary
        </h3>
        {orderSummary.length > 0 ? (
          <ul className="space-y-2 mb-4 text-gray-600">
            {orderSummary.map((item, index) => {
              const discountedPrice = calculateDiscountedPrice(
                item.product.mrp,
                item.product.discount
              ).toFixed(2);
              const totalItemPrice = (discountedPrice * item.quantity).toFixed(
                2
              );

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
        <h3 className="text-lg font-medium mb-3 text-gray-700">
          Shipping Info
        </h3>

        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          disabled={isGeocoding}
          className={`w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isGeocoding ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
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

        {/* Current Location Button */}
        <button
          onClick={getCurrentLocation}
          disabled={isGeocoding}
          className={`mb-3 p-2 rounded-md text-white font-medium transition duration-300 ${
            isGeocoding
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isGeocoding ? "Fetching Location..." : "Use Current Location"}
        </button>

        {/* Map Picker */}
        <h4 className="mb-2 font-medium text-gray-700">Select Location</h4>
        <MapContainer
          center={position || [20.5937, 78.9629]}
          zoom={position ? 15 : 5}
          style={{ height: "300px", width: "100%", marginBottom: "1rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            setLocation={handleLocationSelect}
            position={position}
          />
        </MapContainer>

        <input type="hidden" name="latitude" value={formData.latitude} />
        <input type="hidden" name="longitude" value={formData.longitude} />

        <button
          onClick={handlePlaceOrder}
          disabled={loading || isGeocoding}
          className={`w-full p-3 rounded-md text-white font-medium transition duration-300 ${
            loading || isGeocoding
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
