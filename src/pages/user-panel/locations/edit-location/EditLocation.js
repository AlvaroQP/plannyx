import React, { useState, useEffect } from "react";
import styles from "./EditLocation.module.css";
import { Dialog, DialogTitle, DialogContent, Alert } from "@mui/material";
import { useLocations } from "../../../../context/locations/LocationsProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { TextField } from "@mui/material";
import CustomButton from "../../../../components/ui/button/CustomButton";
import { useTranslation } from "react-i18next";
import { useDialog } from "../../../../context/dialog/DialogProvider";

export default function EditLocation({
  locationIdToEdit,
  handleCloseEditLocationDialog,
}) {
  const { t } = useTranslation();
  const { openDialog } = useDialog();
  const { setIsLoading } = useLoading();
  const { getLocationById, getAllLocations, putLocation } = useLocations();
  const [locationToEdit, setLocationToEdit] = useState({});
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      if (locationIdToEdit !== null) {
        const location = await getLocationById(locationIdToEdit);
        setLocationToEdit(location);
      }
    }

    fetchLocation();
  }, [locationIdToEdit, getLocationById]);

  async function handleEditLocation() {
    setIsValid(true);
    setIsLoading(true);

    if (locationToEdit.name === "") {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    try {
      await putLocation(locationIdToEdit, locationToEdit);
      await getAllLocations();
      openDialog({
        title: t("locations.location-success"),
        description: t("locations.location-edited"),
        severity: "success",
      });
      handleCloseEditLocationDialog();
    } catch (error) {
      console.error(error);
      openDialog({
        title: t("locations.location-error"),
        description: t("locations.location-not-edited"),
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={locationIdToEdit !== null}
      onClose={handleCloseEditLocationDialog}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        {t("locations.edit-location")}
      </DialogTitle>
      {!isValid && (
        <Alert severity="error" sx={{ margin: "0 1rem" }}>
          {t("locations.name-is-required")}
        </Alert>
      )}

      <DialogContent>
        <TextField
          label={t("locations.location-name")}
          fullWidth
          value={locationToEdit?.name || ""}
          onChange={(e) =>
            setLocationToEdit((prevLocation) => ({
              ...prevLocation,
              name: e.target.value,
            }))
          }
          sx={{ mt: "1rem", mb: "1.5rem" }}
        />
        <TextField
          label={t("locations.location-description")}
          fullWidth
          multiline
          rows={4}
          value={locationToEdit?.description || ""}
          onChange={(e) =>
            setLocationToEdit((prevLocation) => ({
              ...prevLocation,
              description: e.target.value,
            }))
          }
        />
      </DialogContent>
      <div className={styles.buttonsContainer}>
        <CustomButton
          text={t("button.cancel")}
          onClick={handleCloseEditLocationDialog}
          variant="outlined"
          color="error"
        />

        <CustomButton
          onClick={handleEditLocation}
          text={t("button.save")}
          variant="contained"
        />
      </div>
    </Dialog>
  );
}
