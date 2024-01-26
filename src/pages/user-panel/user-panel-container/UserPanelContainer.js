import React from "react";
import logo from "../../../assets/images/logo-blue.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import CustomDivider from "../../../components/ui/divider/CustomDivider";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutButtonSideBar from "../../../auth/logout/LogoutButtonSideBar";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import styles from "./UserPanelContainer.module.css";

export default function UserPanelContainer() {
  return (
    <>
      <Sidebar className={styles["sidebar-container"]}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="logo" />
        </div>

        <CustomDivider />
        <Menu>
          <MenuItem>
            <p className={styles["title-p"]}>General</p>
          </MenuItem>
          <SubMenu
            label="Projects"
            icon={<ListAltIcon className={styles.icon} />}
          >
            <MenuItem> New Project</MenuItem>
            <MenuItem> My Projects</MenuItem>
          </SubMenu>
          <MenuItem icon={<CalendarMonthIcon className={styles.icon} />}>
            Calendar
          </MenuItem>
          <SubMenu
            label="Dashboard"
            icon={<BarChartIcon className={styles.icon} />}
          >
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>

          <CustomDivider />

          <MenuItem>
            <p className={styles["title-p"]}>Settings</p>
          </MenuItem>

          <MenuItem icon={<AccountCircleIcon className={styles.icon} />}>
            Profile
          </MenuItem>

          <SubMenu
            label="Language"
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
    </>
  );
}
