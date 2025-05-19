import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x-blue.png",
  iconUrl: "/leaflet/marker-icon-blue.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const LeafletMap = ({ lat, lng, title = "장소" }) => {
  return (
    <div className="w-full aspect-square rounded-lg overflow-hidden z-0">
      <MapContainer
        center={[lat, lng]}
        zoom={16}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} interactive={false}>
          <Tooltip direction="top" offset={[0, -10]} permanent>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
