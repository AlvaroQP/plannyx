import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { BeatLoader } from "react-spinners";
import { useLoading } from "../../../context/loading/LoadingProvider";

export default function LoadingBackdropSpinner() {
  const { isLoading } = useLoading();

  return (
    <Backdrop
      open={isLoading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <BeatLoader color="#a5d8ff" size="1.5rem" loading />
    </Backdrop>
  );
}
