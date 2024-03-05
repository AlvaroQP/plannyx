import React from "react";
import styles from "./UserPanelHome.module.css";
import UserPanelHeader from "../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../auth/auth-context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function UserPanelHome() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <UserPanelHeader title={`${t("login.welcome")}, ${user.displayName}`} />
      <div className={styles["user-panel-home"]}>
        <div
          className={styles["my-projects-container"]}
          onClick={() => navigate("/user-panel/projects/all")}
        >
          <div className={styles["title-container"]}>
            <div className={styles["title"]}>
              {t("user-panel-sidebar.my-projects")}
            </div>
          </div>
        </div>

        <div
          className={styles["to-do-list-container"]}
          onClick={() => navigate("/user-panel/reminders")}
        >
          <div className={styles["title-container"]}>
            <div className={styles["title"]}>
              {t("user-panel-sidebar.to-do-list")}
            </div>
          </div>
        </div>

        <div
          className={styles["locations-container"]}
          onClick={() => navigate("/user-panel/locations")}
        >
          <div className={styles["title-container"]}>
            <div className={styles["title"]}>
              {t("user-panel-sidebar.locations")}
            </div>
          </div>
        </div>

        <div
          className={styles["calendar-container"]}
          onClick={() => navigate("/user-panel/calendar")}
        >
          <div className={styles["title-container"]}>
            <div className={styles["title"]}>
              {t("user-panel-sidebar.calendar")}
            </div>
          </div>
        </div>

        <div
          className={styles["dashboard-container"]}
          onClick={() => navigate("/user-panel/dashboard")}
        >
          <div className={styles["title-container"]}>
            <div className={styles["title"]}>
              {t("user-panel-sidebar.dashboard")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
