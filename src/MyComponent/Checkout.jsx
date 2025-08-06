import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon for marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
    dragend(e) {
      setPosition([e.target.getLatLng().lat, e.target.getLatLng().lng]);
    },
  });

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const { lat, lng } = e.target.getLatLng();
          setPosition([lat, lng]);
        },
      }}
    />
  ) : null;
};

const Checkout = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState([28.6139, 77.209]); // Default: Delhi

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const isValid = Object.values(formData).every((val) => val.trim() !== "");
    if (!isValid) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Order placed successfully!");
    navigate("/discounted-stationary");
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left - Order Summary */}
        <div className="col-md-5 mb-4">
          <div className="border rounded p-4 shadow-sm">
            <h4 className="mb-3">Order Summary</h4>
            {/* Sample summary; you can dynamically show cart items here */}
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Notebook x 2</span>
                <strong>₹100</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Pen x 3</span>
                <strong>₹60</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>₹160</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Right - Form */}
        <div className="col-md-7">
          <div className="border rounded p-4 shadow-sm">
            <h4 className="mb-3">Shipping Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    placeholder="Pin Code"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <textarea
                    name="address"
                    className="form-control"
                    placeholder="Full Address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-12 mb-3">
                  <input
                    type="text"
                    name="landmark"
                    className="form-control"
                    placeholder="Landmark (optional)"
                    value={formData.landmark}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Map */}
              <div className="mb-3">
                <h6>Select Delivery Location on Map</h6>
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={true}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>

              {/* Place Order */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
