import Map, { FullscreenControl, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaMapMarkedAlt, FaStoreAlt } from "react-icons/fa";

interface Customer {
  id: number;
  salesman: string;
  customer_code: string;
  customer_name: string | null;
  contact: string | null;
  longitude: number | null;
  latitude: number | null;
  taggingStatus: string;
}

const CustomerMap = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      },
      (err) => console.error(err)
    );
  }, []);

  // Fetch customer data by ID
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get<Customer>(`http://localhost:5000/api/upload/customers/${id}`);
        setCustomer(res.data);
        console.log(res)
        return res.data
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchCustomer();
  }, [id]);

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`, "_blank");
  };

  if (!customer) return <div className="p-6 text-center">Loading customer info...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Map Section */}
      <div className="flex-1 rounded-lg overflow-hidden bg-white p-4 shadow-lg">
        <div className="flex gap-2 mb-2">
          <FaMapMarkedAlt className="text-xl text-blue-300" />
          <p className="">MAP INFO</p>
        </div>
        <Map
          mapboxAccessToken="pk.eyJ1IjoiamVwcHAiLCJhIjoiY2xsMDc3d2ppMDRzYjNxbXlubDA3NzVibCJ9.AxgzM3fm0IkZR5WlQ_IOMg"
          initialViewState={{
            longitude: customer.longitude || 0,
            latitude: customer.latitude || 0,
            zoom: 16,
          }}
          style={{ width: "100%", height: "500px" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <FullscreenControl />
          {customer.longitude && customer.latitude && (
            <Marker color="red" longitude={customer.longitude} latitude={customer.latitude} />
          )}
          {userLocation && <Marker color="blue" longitude={userLocation.longitude} latitude={userLocation.latitude} />}
        </Map>
      </div>

      {/* Customer Info Section */}
      <div className="flex-1">
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold flex gap-4 items-center"><FaStoreAlt className="text-blue-300" /> {customer.customer_name || customer.customer_code}</h2>
          <p>
            <span className="font-semibold">Salesman:</span> {customer.salesman}
          </p>
          <p>
            <span className="font-semibold">Code:</span> {customer.customer_code}
          </p>
          {customer.contact && (
            <p>
              <span className="font-semibold">Contact:</span> {customer.contact}
            </p>
          )}
          <p>
            <span className="font-semibold">Status:</span> {customer.taggingStatus}
          </p>

          {customer.latitude && customer.longitude && (
            <button
              onClick={() => openGoogleMaps(customer.latitude!, customer.longitude!)}
              className="mt-4 bg-gray-800 cursor-pointer text-white px-4 py-2 rounded hover:bg-mainbg-dark transition"
            >
              Navigate to Customer
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default CustomerMap;
