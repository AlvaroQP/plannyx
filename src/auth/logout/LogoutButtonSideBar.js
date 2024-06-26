import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/alerts/AlertProvider";
import { useAuth } from "../auth-context/AuthProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomDialog from "../../components/ui/dialog/CustomDialog";
import { useTranslation } from "react-i18next";
import { MenuItem } from "react-pro-sidebar";
import { Tooltip } from "@mui/material";

export default function LogoutButtonSideBar({ collapsed }) {
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

  const logoutButtonMenuItem = (
    <MenuItem
      icon={<LogoutIcon sx={{ color: "#3071d4" }} />}
      onClick={handleOpenConfirmLogout}
    >
      {t("logout.logout")}
    </MenuItem>
  );

  return (
    <>
      {collapsed ? (
        <Tooltip title={t("logout.logout")} placement="right">
          <div>{logoutButtonMenuItem}</div>
        </Tooltip>
      ) : (
        logoutButtonMenuItem
      )}

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
