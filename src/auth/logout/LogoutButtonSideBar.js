import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/alerts/AlertProvider";
import { useAuth } from "../auth-context/AuthProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomDialog from "../../components/ui/dialog/CustomDialog";
import { useTranslation } from "react-i18next";
import { MenuItem } from "react-pro-sidebar";

export default function LogoutButtonSideBar() {
  const { logout, setIsUserEmailVerified } = useAuth();
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
      setIsUserEmailVerified(false);
      createAlert("success", `${t("logout.goodbye")}, ${user.displayName}!`);
      navigate("/");
    } catch (error) {
      createAlert("error", t("logout.failed-to-logout"));
    }
  }

  return (
    <>
      <MenuItem
        icon={<LogoutIcon sx={{ color: "#3071d4" }} />}
        onClick={handleOpenConfirmLogout}
      >
        Logout
      </MenuItem>

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
