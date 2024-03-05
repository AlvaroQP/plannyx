import React from "react";
import logo from "../../../assets/images/logo-blue.png";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import CustomDivider from "../../../components/ui/divider/CustomDivider";
import LogoutButtonSideBar from "../../../auth/logout/LogoutButtonSideBar";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Flags from "../../../components/ui/flags/sidebar/Flags";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../../context/sidebar/SidebarProvider";
import { useLocation } from "react-router-dom";
import UserPanelHome from "../user-panel-home/UserPanelHome";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./UserPanelContainer.module.css";

export default function UserPanelContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, handleCollapseClick } = useSidebar();
  const isActive = (path) => location.pathname === path;

  const myProjectsMenu = (
    <MenuItem
      icon={<ListAltIcon sx={{ color: "#138dd8" }} />}
      className={isActive("/user-panel/projects/all") ? styles.active : ""}
      onClick={() => navigate("/user-panel/projects/all")}
    >
      {t("user-panel-sidebar.my-projects")}
    </MenuItem>
  );

  const toDoListMenu = (
    <MenuItem
      icon={<ViewListIcon sx={{ color: "#3b9e06" }} />}
      className={isActive("/user-panel/reminders") ? styles.active : ""}
      onClick={() => navigate("/user-panel/reminders")}
    >
      {t("user-panel-sidebar.to-do-list")}
    </MenuItem>
  );

  const locationsMenu = (
    <MenuItem
      icon={<LocationOnIcon sx={{ color: "#19b0d6" }} />}
      className={isActive("/user-panel/locations") ? styles.active : ""}
      onClick={() => navigate("/user-panel/locations")}
    >
      {t("user-panel-sidebar.locations")}
    </MenuItem>
  );

  const calendarMenu = (
    <MenuItem
      icon={<CalendarMonthIcon sx={{ color: "#e51028" }} />}
      className={isActive("/user-panel/calendar") ? styles.active : ""}
      onClick={() => navigate("/user-panel/calendar")}
    >
      {t("user-panel-sidebar.calendar")}
    </MenuItem>
  );

  const dashboardMenu = (
    <MenuItem
      icon={<BarChartIcon sx={{ color: "#e069cc" }} />}
      className={isActive("/user-panel/dashboard") ? styles.active : ""}
      onClick={() => navigate("/user-panel/dashboard")}
    >
      {t("user-panel-sidebar.dashboard")}
    </MenuItem>
  );

  const notificationsMenu = (
    <MenuItem
      icon={<NotificationsIcon sx={{ color: "#d69900" }} />}
      className={isActive("/user-panel/notifications") ? styles.active : ""}
      onClick={() => navigate("/user-panel/notifications")}
    >
      {t("user-panel-sidebar.notifications")}
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
              <ChevronRightIcon
                className={`${styles["toggle-icon-right"]}`}
                sx={{ fontSize: "2rem" }}
              />
            ) : (
              <Tooltip title={t("user-panel-sidebar.collapse")}>
                <ChevronLeftIcon
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
            <Tooltip
              title={t("user-panel-sidebar.my-projects")}
              placement="right"
            >
              <div>{myProjectsMenu}</div>
            </Tooltip>
          ) : (
            myProjectsMenu
          )}

          {collapsed ? (
            <Tooltip
              title={t("user-panel-sidebar.to-do-list")}
              placement="right"
            >
              <div>{toDoListMenu}</div>
            </Tooltip>
          ) : (
            toDoListMenu
          )}

          {collapsed ? (
            <Tooltip
              title={t("user-panel-sidebar.locations")}
              placement="right"
            >
              <div>{locationsMenu}</div>
            </Tooltip>
          ) : (
            locationsMenu
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

          {collapsed ? (
            <Tooltip
              title={t("user-panel-sidebar.notifications")}
              placement="right"
            >
              <div>{notificationsMenu}</div>
            </Tooltip>
          ) : (
            notificationsMenu
          )}

          <CustomDivider />

          {!collapsed && (
            <p className={styles["title-p"]}>
              {t("user-panel-sidebar.settings")}
            </p>
          )}

          {collapsed ? <Flags collapsed={true} /> : <Flags />}

          {collapsed ? (
            <LogoutButtonSideBar collapsed={true} />
          ) : (
            <LogoutButtonSideBar />
          )}
        </Menu>
      </Sidebar>

      <div className={styles["outlet-container"]}>
        {location.pathname === "/user-panel" || location.pathname === "/" ? (
          <UserPanelHome />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
