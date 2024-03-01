import React, { useState } from "react";
import styles from "./AddLocationDialog.module.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import CustomButton from "../../../../components/ui/button/CustomButton";
import Alert from "@mui/material/Alert";
import Markers from "../markers/Markers";
import CustomDivider from "../../../../components/ui/divider/CustomDivider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useLocations } from "../../../../context/locations/LocationsProvider";
import { useDialog } from "../../../../context/dialog/DialogProvider";

export default function AddLocationDialog({
  location,
  closeAddLocationDialog,
}) {
  const { t } = useTranslation();
  const { openDialog } = useDialog();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [marker, setMarker] = useState("location");
  const lat = location.lat;
  const lng = location.lng;
  const [validForm, setValidForm] = useState(true);
  const { setIsLoading } = useLoading();
  const {
    postLocation,
    getAllLocations,
    handleChangeMapCoords,
    handleChangeMapZoomLevel,
    addLocationCount,
  } = useLocations();

  async function handleAddLocation(e) {
    e.preventDefault();
    setValidForm(true);
    setIsLoading(true);

    if (name.trim() === "") {
      setValidForm(false);
      setIsLoading(false);
      return;
    }

    const newLocation = {
      name,
      description,
      marker,
      lat,
      lng,
    };

    try {
      await postLocation(newLocation);
      await getAllLocations();
      addLocationCount();
      handleChangeMapCoords([lat, lng]);
      handleChangeMapZoomLevel(16);
      openDialog({
        title: t("locations.location-success"),
        description: t("locations.location-added"),
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      openDialog({
        title: t("locations.location-error"),
        description: t("locations.location-not-added"),
        severity: "error",
      });
    } finally {
      setIsLoading(false);
      closeAddLocationDialog();
    }
  }

  function handleMarkerChange(e) {
    setMarker(e.target.value);
  }

  return (
    <Dialog open={location !== null} onClose={closeAddLocationDialog}>
      <DialogTitle sx={{ textAlign: "center" }}>
        {t("locations.add-location")}
      </DialogTitle>
      {validForm === false && (
        <Alert severity="error">{t("locations.location-name-required")}</Alert>
      )}
      <DialogContent>
        <form onSubmit={handleAddLocation}>
          <CustomDivider />
          <Markers marker={marker} handleMarkerChange={handleMarkerChange} />
          <CustomDivider />
          <TextField
            label={t("locations.location-name")}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            label={t("locations.location-description")}
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <div className={styles["buttons-container"]}>
            <CustomButton
              text={t("button.cancel")}
              onClick={closeAddLocationDialog}
              variant="outlined"
              color="error"
            ></CustomButton>
            <CustomButton
              text={t("button.save")}
              type="submit"
              variant="contained"
              color="primary"
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
