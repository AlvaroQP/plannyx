import React, { useState } from "react";
import logo from "../../../assets/images/logo-blue.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import CustomDivider from "../../../components/ui/divider/CustomDivider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutButtonSideBar from "../../../auth/logout/LogoutButtonSideBar";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Flags from "../../../components/ui/flags/sidebar/Flags";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import styles from "./UserPanelContainer.module.css";

export default function UserPanelContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function handleCollapseClick() {
    setCollapsed(!collapsed);
  }

  const projectsMenu = (
    <SubMenu
      label={t("user-panel-sidebar.projects")}
      icon={<ListAltIcon className={styles.icon} />}
    >
      <MenuItem onClick={() => navigate("/user-panel/projects/new")}>
        {t("user-panel-sidebar.new-project")}
      </MenuItem>
      <MenuItem onClick={() => navigate("/user-panel/projects/all")}>
        {t("user-panel-sidebar.my-projects")}
      </MenuItem>
    </SubMenu>
  );

  const calendarMenu = (
    <MenuItem icon={<CalendarMonthIcon className={styles.icon} />}>
      {t("user-panel-sidebar.calendar")}
    </MenuItem>
  );

  const dashboardMenu = (
    <SubMenu
      label={t("user-panel-sidebar.dashboard")}
      icon={<BarChartIcon className={styles.icon} />}
    >
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
      <MenuItem>3</MenuItem>
    </SubMenu>
  );

  const profileMenu = (
    <MenuItem icon={<AccountCircleIcon className={styles.icon} />}>
      {t("user-panel-sidebar.profile")}
    </MenuItem>
  );

  return (
    <div className={styles["user-panel-container"]}>
      <Sidebar
        className={styles["sidebar-container"]}
        collapsed={collapsed}
        transitionDuration={500}
        backgroundColor="#e3e3e3"
      >
        <div className={styles["logo-container"]}>
          {collapsed ? null : (
            <NavLink to="/user-panel" end>
              <img src={logo} alt="logo" />
            </NavLink>
          )}
          <div
            onClick={handleCollapseClick}
            className={styles["toggle-icon-container"]}
          >
            {collapsed ? (
              <ArrowCircleRightIcon
                className={`${styles["toggle-icon"]} ${styles["toggle-icon-right"]}`}
                sx={{ fontSize: "2rem" }}
              />
            ) : (
              <Tooltip title={t("user-panel-sidebar.collapse")}>
                <ArrowCircleLeftIcon
                  className={styles["toggle-icon"]}
                  sx={{ fontSize: "2rem" }}
                />
              </Tooltip>
            )}
          </div>
        </div>

        <CustomDivider />

        <Menu>
          {!collapsed && (
            <p className={styles["title-p"]}>
              {t("user-panel-sidebar.general")}
            </p>
          )}

          {collapsed ? (
            <Tooltip title={t("user-panel-sidebar.projects")} placement="right">
              <div>{projectsMenu}</div>
            </Tooltip>
          ) : (
            projectsMenu
          )}

          {collapsed ? (
            <Tooltip title={t("user-panel-sidebar.calendar")} placement="right">
              <div>{calendarMenu}</div>
            </Tooltip>
          ) : (
            calendarMenu
          )}

          {collapsed ? (
            <Tooltip
              title={t("user-panel-sidebar.dashboard")}
              placement="right"
            >
              <div>{dashboardMenu}</div>
            </Tooltip>
          ) : (
            dashboardMenu
          )}

          <CustomDivider />

          {!collapsed && (
            <p className={styles["title-p"]}>
              {t("user-panel-sidebar.settings")}
            </p>
          )}

          {collapsed ? (
            <Tooltip title={t("user-panel-sidebar.profile")} placement="right">
              <div>{profileMenu}</div>
            </Tooltip>
          ) : (
            profileMenu
          )}

          {collapsed ? <Flags collapsed={true} /> : <Flags />}

          {collapsed ? (
            <LogoutButtonSideBar collapsed={true} />
          ) : (
            <LogoutButtonSideBar />
          )}
        </Menu>
      </Sidebar>

      <Outlet />
    </div>
  );
}
