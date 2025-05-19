import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x-blue.png",
  iconUrl: "/leaflet/marker-icon-blue.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const LeafletMapBookMark = ({ lat, lng, title = "장소" }) => {
  return (
    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden z-0 h-full">
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
        <RecenterMap lat={lat} lng={lng} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} interactive={false}>
          <Tooltip direction="top" offset={[-15, -20]} permanent>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMapBookMark;
