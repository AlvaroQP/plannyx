import React from "react";
import logo from "../../../assets/images/logo-blue.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import CustomDivider from "../../../components/ui/divider/CustomDivider";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutButtonSideBar from "../../../auth/logout/LogoutButtonSideBar";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/language/LanguageProvider";
import changeLanguage from "../../../utils/changeLanguage";
import styles from "./UserPanelContainer.module.css";

export default function UserPanelContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();

  function handleLanguageChange(language) {
    setLanguage(language);
    changeLanguage(language);
  }

  return (
    <div className={styles["user-panel-container"]}>
      <Sidebar className={styles["sidebar-container"]}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="logo" />
        </div>

        <CustomDivider />

        <Menu>
          <MenuItem>
            <p className={styles["title-p"]}>
              {t("user-panel-sidebar.general")}
            </p>
          </MenuItem>
          <SubMenu
            label={t("user-panel-sidebar.projects")}
            icon={<ListAltIcon className={styles.icon} />}
          >
            <MenuItem onClick={() => navigate("projects/new")}>
              {t("user-panel-sidebar.new-project")}
            </MenuItem>
            <MenuItem onClick={() => navigate("projects/all")}>
              {t("user-panel-sidebar.my-projects")}
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<CalendarMonthIcon className={styles.icon} />}>
            {t("user-panel-sidebar.calendar")}
          </MenuItem>
          <SubMenu
            label={t("user-panel-sidebar.dashboard")}
            icon={<BarChartIcon className={styles.icon} />}
          >
            <MenuItem>Pie charts</MenuItem>
            <MenuItem>Line charts</MenuItem>
            <MenuItem>Bar charts</MenuItem>
          </SubMenu>

          <CustomDivider />

          <MenuItem>
            <p className={styles["title-p"]}>
              {t("user-panel-sidebar.settings")}
            </p>
          </MenuItem>

          <MenuItem icon={<AccountCircleIcon className={styles.icon} />}>
            {t("user-panel-sidebar.profile")}
          </MenuItem>

          <SubMenu
            label={t("user-panel-sidebar.language")}
            icon={<LanguageIcon className={styles.icon} />}
          >
            <MenuItem>
              <span className={`fi fi-gb ${styles.flag}`} /> English
            </MenuItem>
            <MenuItem>
              <span className={`fi fi-es ${styles.flag}`} /> Spanish
            </MenuItem>
          </SubMenu>

          <LogoutButtonSideBar />
        </Menu>
      </Sidebar>

      <Outlet />
    </div>
  );
}
