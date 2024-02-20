import React from "react";
import styles from "./Reminders.module.css";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useReminders } from "../../../../context/reminders/RemindersProvider";
import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
} from "@mui/material";
import NewReminder from "../new-reminder/NewReminder";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Reminders() {
  const { t } = useTranslation();
  const { reminders } = useReminders();

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.to-do-list")} />
      <NewReminder />
      <div className={styles["reminders-container"]}>
        {reminders.length > 0 ? (
          <List>
            {reminders.map((reminder) => (
              <ListItem key={reminder.id} className={styles["reminder-item"]}>
                <Checkbox
                  checked={reminder.checked}
                  onChange={() => {}}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <ListItemText primary={reminder.title} />
                <IconButton edge="end" aria-label="delete" onClick={() => {}}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <p className={styles["no-reminders"]}>
            {t("reminders.no-reminders")}
          </p>
        )}
      </div>
    </>
  );
}
