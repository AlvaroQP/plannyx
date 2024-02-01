import React from "react";
import CustomButton from "../button/CustomButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Alert, AlertTitle, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CustomDialog(props) {
  const { open, handleClose, title, severity, description } = props;
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box>
        <DialogContent sx={{ padding: "2rem 1rem" }}>
          <div id="alert-dialog-description">
            <Alert severity={severity}>
              <AlertTitle>{title}</AlertTitle>
              {description}
            </Alert>
          </div>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <CustomButton
            text={t("button.close")}
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();
            }}
          />
        </DialogActions>
      </Box>
    </Dialog>
  );
}
