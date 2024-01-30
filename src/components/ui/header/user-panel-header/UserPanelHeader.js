import React from "react";
import styles from "./UserPanelHeader.module.css";

export default function UserPanelHeader({ title }) {
  return <div className={styles["user-panel-header"]}>{title}</div>;
}
