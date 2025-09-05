import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons
const activeBusIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

const ghostBusIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

function App() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/buses");
        const data = await res.json();

        // Ensure data is an array
        const busArray = Array.isArray(data) ? data : [];
        setBuses(busArray);
      } catch (err) {
        console.error("Error fetching buses:", err);
        setBuses([]);
      }
    };

    fetchBuses();

    // Refresh every 5 seconds
    const interval = setInterval(fetchBuses, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Array.isArray(buses) && buses.map((bus) => (
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
    </div>
  );
}

export default App;
