import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "../styles/Map.css";
import { useState } from "react";
import { Icon } from "leaflet";
import market from "/assets/market.png?.url";

const RESTAURANT_POSITION = [14.5570, -90.7346];

function ClickHandler({ onClickMap }) {
  useMapEvents({
    click(e) {
      onClickMap([e.latlng.lat, e.latlng.lng]);
      console.log("click en:", e.latlng);
    },
  });
  return null;
}

export const MapLeaflet = () => {
  const [position, setPosition] = useState(null);

  const marketIcon = new Icon({
    iconUrl: market,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div id="map">
      <h3>Map</h3>
      <MapContainer
        center={position ? position : RESTAURANT_POSITION}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }} // asegúrate de darle tamaño
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={RESTAURANT_POSITION} icon={marketIcon}>
          <Popup>
            Antigua Burguer´s <br /> Restaurant.
          </Popup>
        </Marker>

        {position && (
          <Marker position={position}>
            <Popup>
              Ubicación del cliente <br />
              {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </Popup>
          </Marker>
        )}

        <ClickHandler onClickMap={setPosition} />
      </MapContainer>
    </div>
  );
};
