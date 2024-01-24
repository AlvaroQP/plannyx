import React from "react";
import Alert from "@mui/material/Alert";

export default function AuthFormAlert(props) {
  const { severity, message } = props;

  return <Alert severity={severity}>{message}</Alert>;
}
