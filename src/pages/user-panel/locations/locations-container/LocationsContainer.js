import React, { useEffect } from "react";
import styles from "./LocationsContainer.module.css";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import MapContainer from "../map-container/MapContainer";
import LocationList from "../location-list/LocationList";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLocations } from "../../../../context/locations/LocationsProvider";

export default function LocationsContainer() {
  const {
    mapOrLocations,
    handleMapOrLocationsChange,
    handleChangeMapCoords,
    handleChangeMapZoomLevel,
  } = useLocations();

  const { t } = useTranslation();

  useEffect(() => {
    handleMapOrLocationsChange(null, "map");
    handleChangeMapCoords([40.4637, -3.7492]);
    handleChangeMapZoomLevel(5);
    // eslint-disable-next-line
  }, []);

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
