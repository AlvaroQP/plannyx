import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAlert } from "../../../context/alerts/AlertProvider";

export default function CustomAlert() {
  const { alert, closeAlert } = useAlert();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  function handleClose() {
    setOpen(false);
    closeAlert();
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      variant="filled"
      /* autoHideDuration={10000} */
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        width: "100%",
        marginTop: 0,
      }}
    >
      <Alert
        severity={alert?.severity}
        onClose={handleClose}
        sx={{ width: "100%", marginTop: 0 }}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
}
