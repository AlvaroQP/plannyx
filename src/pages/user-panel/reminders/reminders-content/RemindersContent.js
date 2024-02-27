import React, { useState, useEffect } from "react";
import styles from "./RemindersContent.module.css";
import { Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotesIcon from "@mui/icons-material/Notes";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomDialog from "../../../../components/ui/dialog/CustomDialog";
import Tooltip from "@mui/material/Tooltip";
import { useReminders } from "../../../../context/reminders/RemindersProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useDialog } from "../../../../context/dialog/DialogProvider";
import EditReminder from "../edit-reminder/EditReminder";

export default function RemindersContent({ reminders }) {
  const { t } = useTranslation();
  const [showNotes, setShowNotes] = useState(false);
  const [filter, setFilter] = useState("dateAsc");
  const [activeArchived, setActiveArchived] = useState("active");
  const [activeReminders, setActiveReminders] = useState([]);
  const [archivedReminders, setArchivedReminders] = useState([]);
  const [editingReminder, setEditingReminder] = useState(null);
  const [isDeleteReminderDialogOpen, setIsDeleteReminderDialogOpen] =
    useState(false);
  const [reminderId, setReminderId] = useState(null);
  const { deleteReminder } = useReminders();
  const { setIsLoading } = useLoading();
  const { openDialog } = useDialog();
  const [openEditReminder, setOpenEditReminder] = useState(false);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let active = reminders.filter(
      (reminder) => reminder.date.toDate() >= today
    );

    let archived = reminders.filter(
      (reminder) => reminder.date.toDate() < today
    );

    const priorityMap = {
      low: 1,
      medium: 2,
      high: 3,
      critical: 4,
    };

    const sortReminders = (reminders) => {
      if (filter === "dateAsc") {
        return reminders.sort((a, b) => a.date.toDate() - b.date.toDate());
      } else if (filter === "dateDesc") {
        return reminders.sort((a, b) => b.date.toDate() - a.date.toDate());
      } else if (filter === "priorityAsc") {
        return reminders.sort(
          (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
        );
      } else if (filter === "priorityDesc") {
        return reminders.sort(
          (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
        );
      }
      return reminders;
    };

    active = sortReminders(active);
    archived = sortReminders(archived);

    setActiveReminders(active);
    setArchivedReminders(archived);
  }, [reminders, filter]);

  function toggleNotes(id) {
    setShowNotes((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  }

  function showPriority(priority) {
    if (priority === "low") {
      return (
        <div className={styles["priority-container"]}>
          <SignalCellular1BarIcon
            sx={{ fontSize: ".8rem", color: "#029a02" }}
          />
          <div>{t("reminders.priority-low")}</div>
        </div>
      );
    } else if (priority === "medium") {
      return (
        <div className={styles["priority-container"]}>
          <SignalCellular2BarIcon
            sx={{ fontSize: ".8rem", color: "#ff6b02" }}
          />
          <div>{t("reminders.priority-medium")}</div>
        </div>
      );
    } else if (priority === "high") {
      return (
        <div className={styles["priority-container"]}>
          <SignalCellular3BarIcon
            sx={{ fontSize: ".8rem", color: "#cd0303" }}
          />
          <div>{t("reminders.priority-high")}</div>
        </div>
      );
    } else if (priority === "critical") {
      return (
        <div className={styles["priority-container"]}>
          <SignalCellularConnectedNoInternet4BarIcon
            sx={{ fontSize: ".8rem", color: "#ff0000" }}
          />
          <div>{t("reminders.priority-critical")}</div>
        </div>
      );
    }
  }

  function handleActiveArchivedChange(event, value) {
    if (value !== null) {
      setActiveArchived(value);
    }
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  const activeArchivedButtons = (
    <ToggleButtonGroup
      value={activeArchived}
      exclusive
      onChange={handleActiveArchivedChange}
    >
      <ToggleButton
        value="active"
        sx={
          activeArchived === "active"
            ? { "&.MuiToggleButton-root": { fontWeight: "600" } }
            : {}
        }
      >
        <CircleIcon
          sx={{ fontSize: ".9rem", mr: ".25rem", color: "#008000" }}
        />
        {t("reminders.active")}
      </ToggleButton>
      <ToggleButton
        value="archived"
        sx={
          activeArchived === "archived"
            ? { "&.MuiToggleButton-root": { fontWeight: "600" } }
            : {}
        }
      >
        <InventoryIcon
          sx={{ fontSize: ".9rem", mr: ".25rem", color: "#464141" }}
        />
        {t("reminders.archived")}
      </ToggleButton>
    </ToggleButtonGroup>
  );

  const filterSelect = (
    <Select
      value={filter}
      onChange={handleFilterChange}
      sx={{ fontSize: ".85rem" }}
    >
      <MenuItem value="dateAsc">
        {t("reminders.reminder-date")}{" "}
        <ArrowUpwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
      <MenuItem value="dateDesc">
        {t("reminders.reminder-date")}{" "}
        <ArrowDownwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
      <MenuItem value="priorityAsc">
        {t("reminders.reminder-priority")}{" "}
        <ArrowUpwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
      <MenuItem value="priorityDesc">
        {t("reminders.reminder-priority")}{" "}
        <ArrowDownwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
    </Select>
  );

  function handleEditReminder(reminder) {
    console.log("Edit reminder: ", reminder);
    setEditingReminder(reminder);
    setOpenEditReminder(true);
  }

  function handleCloseEditDialog() {
    setOpenEditReminder(false);
  }

  function handleOpenDeleteReminderDialog(id) {
    setIsDeleteReminderDialogOpen(true);
    setReminderId(id);
  }

  const deleteReminderDialog = (
    <CustomDialog
      open={isDeleteReminderDialogOpen}
      handleClose={() => setIsDeleteReminderDialogOpen(false)}
      title={t("reminders.delete-reminder")}
      description={t("reminders.delete-reminder-message")}
      acceptText={t("button.delete")}
      cancelText={t("button.cancel")}
      acceptAction={deleteReminderAction}
    />
  );

  async function deleteReminderAction() {
    setIsLoading(true);
    try {
      await deleteReminder(reminderId);
      openDialog({
        title: t("reminders.success"),
        description: t("reminders.reminder-deleted"),
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting reminder: ", error);
      openDialog({
        title: t("reminders.error"),
        description: t("reminders.could-not-delete-reminder"),
        severity: "error",
      });
    } finally {
      setIsLoading(false);
      setIsDeleteReminderDialogOpen(false);
      setReminderId(null);
    }
  }

  return (
    <div className={styles["reminders-container"]}>
      {openEditReminder && (
        <EditReminder
          initialReminder={editingReminder}
          handleCloseEditDialog={handleCloseEditDialog}
        />
      )}
      {isDeleteReminderDialogOpen && deleteReminderDialog}
      <div className={styles["filters-and-active-archived-container"]}>
        {filterSelect}
        {activeArchivedButtons}
      </div>
      {(activeArchived === "active" ? activeReminders : archivedReminders).map(
        (reminder) => (
          <Card key={reminder.id} className={styles["reminder-card"]}>
            <CardContent>
              <div className={styles["title-container"]}>
                {reminder.title}
                <div>
                  <Tooltip
                    title={t("reminders.edit-reminder")}
                    className={styles["edit-icon"]}
                    onClick={() => handleEditReminder(reminder)}
                  >
                    <EditIcon sx={{ fontSize: "1.25rem", mr: ".5rem" }} />
                  </Tooltip>
                  <Tooltip
                    title={t("reminders.delete-reminder")}
                    className={styles["delete-icon"]}
                    onClick={() => handleOpenDeleteReminderDialog(reminder.id)}
                  >
                    <DeleteIcon sx={{ fontSize: "1.25rem" }} />
                  </Tooltip>
                </div>
              </div>
              <div className={styles["date-time-priority-container"]}>
                <div>
                  <div className={styles["date-container"]}>
                    <div className={styles.date}>
                      <CalendarMonthIcon
                        sx={{ fontSize: "1rem", color: "#CD2121" }}
                      />
                      <span className={styles.mr}>
                        {reminder.date.toDate().toLocaleDateString()}
                      </span>
                    </div>

                    <div className={styles.time}>
                      <AccessTimeIcon
                        sx={{ fontSize: "1rem", color: "#1970c2" }}
                      />
                      {reminder.time}
                    </div>
                  </div>
                </div>

                {showPriority(reminder.priority)}
              </div>

              {reminder.notes &&
                (showNotes[reminder.id] ? (
                  <div className={styles["notes-container"]}>
                    <div className={styles.note}>{reminder.notes}</div>
                    <Button
                      sx={{ fontSize: ".75rem", ml: "-.5rem" }}
                      onClick={() => toggleNotes(reminder.id)}
                    >
                      {t("reminders.hide-notes")}
                    </Button>
                  </div>
                ) : (
                  <Button
                    sx={{ fontSize: ".75rem", ml: "-.5rem" }}
                    onClick={() => toggleNotes(reminder.id)}
                  >
                    <NotesIcon sx={{ fontSize: "1rem", mr: ".25rem" }} />
                    {t("reminders.show-notes")}
                  </Button>
                ))}
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
