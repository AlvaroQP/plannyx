import React, { useState } from "react";
import CustomButton from "../../components/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/alerts/AlertProvider";
import { useAuth } from "../auth-context/AuthProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomDialog from "../../components/ui/dialog/CustomDialog";
import { useTranslation } from "react-i18next";

export default function LogoutButton() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const { createAlert } = useAlert();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  function handleOpenConfirmLogout() {
    setOpenConfirmLogout(true);
  }

  function handleCloseConfirmLogout() {
    setOpenConfirmLogout(false);
  }

  async function handleLogout() {
    try {
      await logout();
      createAlert("success", `${t("logout.goodbye")}, ${user.displayName}!`);
      navigate("/");
    } catch (error) {
      createAlert("error", t("logout.failed-to-logout"));
    }
  }

  return (
    <>
      <CustomButton
        variant="contained"
        color="primary"
        text={t("button.logout")}
        icon={<LogoutIcon />}
        onClick={handleOpenConfirmLogout}
      />
      <CustomDialog
        open={openConfirmLogout}
        handleClose={handleCloseConfirmLogout}
        title={t("logout.logout")}
        description={t("logout.message")}
        acceptText={t("button.logout")}
        cancelText={t("button.cancel")}
        acceptAction={handleLogout}
      />
    </>
  );
}
