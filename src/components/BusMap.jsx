import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const activeBusIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

const ghostBusIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

export default function BusMap() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/buses");
        const data = await res.json();
        setBuses(data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };

    fetchBuses();
    const interval = setInterval(fetchBuses, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={12} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {buses.length === 0 && <div>No buses available</div>}
      {buses.map(bus => (
        <Marker
          key={bus.id}
          position={[bus.lat, bus.lon]}
          icon={bus.status === "active" ? activeBusIcon : ghostBusIcon}
        >
          <Popup>
            {bus.route} <br /> Status: {bus.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
