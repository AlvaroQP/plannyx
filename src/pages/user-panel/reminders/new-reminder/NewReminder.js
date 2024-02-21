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

export default function NewReminder() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { postReminder } = useReminders();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [reminderDate, setReminderDate] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);
  const [validForm, setValidForm] = useState(true);

  function handleReset() {
    setTitle("");
    setDescription("");
    setPriority("");
    setReminderDate(null);
    setReminderTime(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setValidForm(true);

    const reminder = {
      title,
      description,
      priority,
      reminderDate,
      reminderTime,
    };

    try {
      console.log(reminder);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={styles["new-reminder-form"]} onSubmit={handleSubmit}>
      <TextField
        required
        id="title"
        label={t("reminders.reminder-title")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="filled"
        sx={{ mb: 4, background: "#fff" }}
      />

      <TextField
        id="description"
        label={t("reminders.reminder-description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="filled"
        sx={{ mb: 4, background: "#fff" }}
      />

      <FormControl variant="filled" sx={{ background: "#fff" }} required>
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

      <div className={styles["date-time-container"]}>
        <FormControl variant="standard" sx={{ width: "48%" }}>
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
              slotProps={{ textField: { variant: "filled" } }}
              sx={{ background: "#fff" }}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl variant="standard" sx={{ width: "48%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={language}>
            <TimePicker
              labelId="reminder-time-label"
              id="reminder-time"
              ampm={false}
              value={reminderTime}
              label={t("reminders.reminder-time")}
              onChange={(time) => setReminderTime(time)}
              slotProps={{ textField: { variant: "filled" } }}
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
  );
}
