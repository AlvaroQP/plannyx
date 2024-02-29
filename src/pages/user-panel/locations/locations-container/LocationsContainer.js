import React from "react";
import styles from "./LocationsContainer.module.css";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import MapContainer from "../map-container/MapContainer";

export default function LocationsContainer() {
  const { t } = useTranslation();

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.locations")} />
      <div className={styles["map-container"]}>
        <MapContainer />
      </div>
    </>
  );
}
