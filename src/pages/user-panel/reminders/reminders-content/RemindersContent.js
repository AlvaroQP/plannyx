import React from "react";
import styles from "./RemindersContent.module.css";

export default function RemindersContent({ reminders }) {
  return (
    <div>
      <div className={styles["reminders-container"]}>
        {reminders.map((reminder) => (
          <div key={reminder.id} className={styles["reminder"]}>
            <div className={styles["reminder-title"]}>{reminder.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
