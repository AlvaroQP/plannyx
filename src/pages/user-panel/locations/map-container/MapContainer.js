import React, { useRef, useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { geosearch } from "esri-leaflet-geocoder";
import { arcgisOnlineProvider } from "esri-leaflet-geocoder";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import { useTranslation } from "react-i18next";

export default function Map() {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  const [clickedLocation, setClickedLocation] = useState(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([40.4637, -3.7492], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    geosearch({
      position: "topright",
      placeholder: t("locations.enter-address"),
      useMapBounds: false,
      providers: [
        arcgisOnlineProvider({
          apikey: process.env.REACT_APP_ARCGIS_API_KEY,
        }),
      ],
    }).addTo(map);

    map.on("click", function (e) {
      setClickedLocation(e.latlng);
    });

    return () => {
      map.remove();
    };
    // eslint-disable-next-line
  }, [t]);

  useEffect(() => {
    console.log(clickedLocation);
  }, [clickedLocation]);

  return <div id="map" ref={mapRef} style={{ height: "70vh" }} />;
}
