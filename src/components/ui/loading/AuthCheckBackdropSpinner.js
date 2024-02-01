import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../auth/auth-context/AuthProvider";

export default function LoadingBackdropSpinner() {
  const { isAuthChecking, isLoadingEmailVerification } = useAuth();

  return (
    <Backdrop
      open={isAuthChecking || isLoadingEmailVerification}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <BeatLoader color="#a5d8ff" size="1.5rem" loading />
    </Backdrop>
  );
}
