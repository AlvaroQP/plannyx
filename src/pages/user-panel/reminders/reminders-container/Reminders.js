import React from "react";
import styles from "./Reminders.module.css";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useReminders } from "../../../../context/reminders/RemindersProvider";
import NewReminder from "../new-reminder/NewReminder";
import CustomScrollableTabs from "../../../../components/ui/tabs/CustomScrollableTabs";

export default function Reminders() {
  const { t } = useTranslation();
  const { reminders } = useReminders();

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.to-do-list")} />

      <div className={styles["reminders-container"]}>
        <CustomScrollableTabs
          initialTabId={1}
          tabs={[
            {
              id: 1,
              name: (
                <div className={styles["new-reminder-div"]}>
                  {t("reminders.new-reminder")}
                </div>
              ),
              content: <NewReminder />,
            },
          ]}
        />
      </div>
    </>
  );
}
