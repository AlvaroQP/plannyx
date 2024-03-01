import React, { useState } from "react";
import styles from "./LocationsContainer.module.css";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import MapContainer from "../map-container/MapContainer";
import LocationList from "../location-list/LocationList";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function LocationsContainer() {
  const [mapOrLocations, setMapOrLocations] = useState("map");

  const { t } = useTranslation();

  function handleMapOrLocationsChange(e, value) {
    if (value !== null) {
      setMapOrLocations(value);
    }
  }

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.locations")} />

      <div className={styles["map-container"]}>
        <div className={styles["toggle-buttons-container"]}>
          <ToggleButtonGroup
            value={mapOrLocations}
            exclusive
            onChange={handleMapOrLocationsChange}
          >
            <ToggleButton value="map">{t("locations.map")}</ToggleButton>
            <ToggleButton value="locations">
              {t("locations.locations")}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {mapOrLocations === "map" && <MapContainer />}

        {mapOrLocations === "locations" && <LocationList />}
      </div>
    </>
  );
}
