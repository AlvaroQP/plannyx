import React from "react";
import CustomButton from "../button/CustomButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CustomDialog(props) {
  const {
    open,
    handleClose,
    title,
    description,
    acceptText,
    cancelText,
    acceptAction,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton
          text={cancelText}
          variant="outlined"
          color="error"
          onClick={handleClose}
        />
        <CustomButton
          text={acceptText}
          variant="contained"
          color="primary"
          onClick={() => {
            acceptAction();
            handleClose();
          }}
        />
      </DialogActions>
    </Dialog>
  );
}
