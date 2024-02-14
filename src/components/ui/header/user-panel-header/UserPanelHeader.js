import React, { useState, useEffect } from "react";
import styles from "./UserPanelHeader.module.css";
import { useSidebar } from "../../../../context/sidebar/SidebarProvider";
import { useLanguage } from "../../../../context/language/LanguageProvider";

export default function UserPanelHeader({ title }) {
  const { collapsed } = useSidebar();
  const headerWidth = collapsed ? "calc(100% - 30px)" : "calc(100% - 200px)";
  const { language } = useLanguage();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div
        className={styles["user-panel-header"]}
        style={{ width: headerWidth }}
      >
        <div className={styles["user-panel-header-title"]}>{title}</div>
        <div className={styles["user-panel-date-and-time"]}>
          <span className={styles["date"]}>
            {date.toLocaleDateString(language, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className={styles["time"]}>
            {date.toLocaleTimeString(language, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      <div style={{ height: "73px" }} />
    </>
  );
}
