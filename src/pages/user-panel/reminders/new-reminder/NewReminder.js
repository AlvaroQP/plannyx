import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import styles from "./NewReminder.module.css";
import { useTranslation } from "react-i18next";
import {
  TimePicker,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useReminders } from "../../../../context/reminders/RemindersProvider";
import { useLanguage } from "../../../../context/language/LanguageProvider";
import CustomButton from "../../../../components/ui/button/CustomButton";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import dateFormat from "../../../../utils/dateFormat";
import dayjs from "dayjs";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlightIcon from "@mui/icons-material/Flight";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { Timestamp } from "firebase/firestore";
import Alert from "@mui/material/Alert";
import { useDialog } from "../../../../context/dialog/DialogProvider";

export default function NewReminder() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { setIsLoading } = useLoading();
  const { openDialog } = useDialog();
  const { postReminder, getAllReminders } = useReminders();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [reminderDate, setReminderDate] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);
  const [validForm, setValidForm] = useState(true);

  function handleReset() {
    setTitle("");
    setNotes("");
    setCategory("");
    setPriority("");
    setReminderDate(null);
    setReminderTime(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setValidForm(true);
    setIsLoading(true);

    if (
      title === "" ||
      category === "" ||
      priority === "" ||
      reminderDate === null ||
      reminderTime === null
    ) {
      setValidForm(false);
      setIsLoading(false);
      return;
    }

    const reminder = {
      title,
      notes,
      category,
      priority,
      date: Timestamp.fromDate(reminderDate.toDate()),
      time: reminderTime.format("HH:mm"),
    };

    try {
      await postReminder(reminder);
      await getAllReminders();
      openDialog({
        title: t("reminders.reminder-success"),
        description: t("reminders.reminder-added"),
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      openDialog({
        title: t("reminders.reminder-error"),
        description: t("reminders.reminder-not-added"),
        severity: "error",
      });
    } finally {
      setIsLoading(false);
      handleReset();
    }
  }

  return (
    <>
      <form className={styles["new-reminder-form"]} onSubmit={handleSubmit}>
        {!validForm && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {t("new-project.please-fill-all-fields")}
          </Alert>
        )}

        <TextField
          required
          id="title"
          label={t("reminders.reminder-title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 4, background: "#fff" }}
        />

        <TextField
          multiline
          id="notes"
          label={t("reminders.reminder-notes")}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ background: "white", mb: "2rem" }}
        />

        <div className={styles["category-priority-container"]}>
          <FormControl sx={{ background: "#fff" }} required>
            <InputLabel id="category-select-label">
              {t("reminders.category")}
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-label"
              required
              value={category}
              label={t("new-project.category")}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="work">
                <span className={styles["category-text"]}>
                  <WorkIcon sx={{ fontSize: "1.2rem" }} />
                  {t("reminders.category-work")}
                </span>
              </MenuItem>
              <MenuItem value="personal">
                <span className={styles["category-text"]}>
                  <PersonIcon sx={{ fontSize: "1.2rem" }} />
                  {t("reminders.category-personal")}
                </span>
              </MenuItem>
              <MenuItem value="health">
                <span className={styles["category-text"]}>
                  <LocalHospitalIcon sx={{ fontSize: "1.2rem" }} />
                  {t("reminders.category-health")}
                </span>
              </MenuItem>
              <MenuItem value="education">
                <span className={styles["category-text"]}>
                  <SchoolIcon sx={{ fontSize: "1.2rem" }} />
                  {t("reminders.category-education")}
                </span>
              </MenuItem>
              <MenuItem value="finance">
                <span className={styles["category-text"]}>
                  <AccountBalanceIcon sx={{ fontSize: "1.2rem" }} />
                  {t("reminders.category-finance")}
                </span>
              </MenuItem>
              <MenuItem value="shopping">
                <span className={styles["category-text"]}>
                  <ShoppingCartIcon sx={{ fontSize: "1.2rem" }} />
                  {t("reminders.category-shopping")}
                </span>
              </MenuItem>
              <MenuItem value="travel">
                <span className={styles["category-text"]}>
                  <FlightIcon sx={{ fontSize: "1.2rem" }} />
                  {t("reminders.category-travel")}
                </span>
              </MenuItem>
              <MenuItem value="family">
                <span className={styles["category-text"]}>
                  <FamilyRestroomIcon sx={{ fontSize: "1.2rem" }} />
                  {t("reminders.category-family")}
                </span>
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ background: "#fff" }} required>
            <InputLabel id="priority-select-label">
              {t("reminders.reminder-priority")}
            </InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-label"
              required
              value={priority}
              label={t("new-project.project-priority")}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="low">
                <span className={styles["low-priority-text"]}>
                  <SignalCellular1BarIcon
                    className={styles["priority-icon-low"]}
                    sx={{ fontSize: "1.2rem" }}
                  />
                  {t("reminders.priority-low")}
                </span>
              </MenuItem>
              <MenuItem value="medium">
                <span className={styles["medium-priority-text"]}>
                  <SignalCellular2BarIcon
                    className={styles["priority-icon-medium"]}
                    sx={{ fontSize: "1.2rem" }}
                  />
                  {t("reminders.priority-medium")}
                </span>
              </MenuItem>
              <MenuItem value="high">
                <span className={styles["high-priority-text"]}>
                  <SignalCellular3BarIcon
                    className={styles["priority-icon-high"]}
                    sx={{ fontSize: "1.2rem" }}
                  />
                  {t("reminders.priority-high")}
                </span>
              </MenuItem>
              <MenuItem value="critical">
                <span className={styles["critical-priority-text"]}>
                  <SignalCellularConnectedNoInternet4BarIcon
                    className={styles["priority-icon-critical"]}
                    sx={{ fontSize: "1.2rem" }}
                  />
                  {t("reminders.priority-critical")}
                </span>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={styles["date-time-container"]}>
          <FormControl variant="standard">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={dayjs.locale(language)}
            >
              <DatePicker
                labelId="reminder-date-label"
                id="reminder-date"
                inputFormat={dateFormat()}
                label={t("reminders.reminder-date")}
                value={reminderDate}
                onChange={(date) => setReminderDate(date)}
                slotProps={{ textField: { required: true } }}
                sx={{ background: "#fff" }}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs} locale={language}>
              <TimePicker
                labelId="reminder-time-label"
                id="reminder-time"
                ampm={false}
                value={reminderTime}
                label={t("reminders.reminder-time")}
                onChange={(time) => setReminderTime(time)}
                slotProps={{ textField: { required: true } }}
                sx={{ background: "#fff" }}
              />
            </LocalizationProvider>
          </FormControl>
        </div>

        <div className={styles.buttonsContainer}>
          <CustomButton
            text={t("button.reset")}
            variant="outlined"
            color="error"
            icon={<RestartAltOutlinedIcon />}
            onClick={handleReset}
          />
          <CustomButton
            type="submit"
            text={t("button.submit")}
            variant="contained"
            color="primary"
            icon={<CheckCircleOutlineOutlinedIcon />}
          />
        </div>
      </form>
    </>
  );
}
