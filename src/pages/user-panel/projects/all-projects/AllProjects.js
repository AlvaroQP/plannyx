import React from "react";
import { useTranslation } from "react-i18next";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import styles from "./AllProjects.module.css";

export default function AllProjects() {
  const { t } = useTranslation();

  return (
    <div className={styles["all-projects-container"]}>
      <UserPanelHeader title={t("user-panel-sidebar.my-projects")} />
    </div>
  );
}
