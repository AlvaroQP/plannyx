import React, { useRef, useState, useEffect } from "react";
import styles from "./MapContainer.module.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { geosearch } from "esri-leaflet-geocoder";
import { arcgisOnlineProvider } from "esri-leaflet-geocoder";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import { useTranslation } from "react-i18next";
import AddLocationDialog from "../add-location-dialog/AddLocationDialog";
import { useLocations } from "../../../../context/locations/LocationsProvider";
import displayLocationMarkerInMap from "../../../../utils/displayLocationMarkerInMap";

export default function Map() {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [openAddLocationDialog, setOpenAddLocationDialog] = useState(false);
  const { locations, mapCoords, mapZoomLevel, locationCount } = useLocations();

  useEffect(() => {
    const map = L.map(mapRef.current).setView(mapCoords, mapZoomLevel);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: displayLocationMarkerInMap(location.marker),
      }).addTo(map);

      let popupContent = `<b><span style="font-size: 1rem">${location.name}</span></b>`;
      if (location.description !== "") {
        popupContent += "<br /> <br />" + location.description;
      }

      marker.bindPopup(popupContent, {
        offset: [0, -5],
      });

      marker.on("click", function () {
        map.setView([location.lat, location.lng], 16);
      });
    });

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
      setOpenAddLocationDialog(true);
    });

    return () => {
      map.remove();
    };
    // eslint-disable-next-line
  }, [t, locationCount]);

  function closeAddLocationDialog() {
    setOpenAddLocationDialog(false);
  }

  return (
    <>
      {clickedLocation && openAddLocationDialog && (
        <AddLocationDialog
          location={clickedLocation}
          closeAddLocationDialog={closeAddLocationDialog}
        />
      )}
      <div className={styles["click-map-text-container"]}>
        {t("locations.click-map-add-location")}
      </div>
      <div id="map" ref={mapRef} style={{ height: "70vh" }} />
    </>
  );
}
