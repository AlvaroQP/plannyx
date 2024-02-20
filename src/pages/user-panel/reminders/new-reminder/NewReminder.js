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
import dateFormat from "../../../../utils/dateFormat";
import dayjs from "dayjs";

export default function NewReminder() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { postReminder } = useReminders();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [reminderDate, setReminderDate] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);
  const [validForm, setValidForm] = useState(true);

  function handleReset() {
    setTitle("");
    setDescription("");
    setPriority("low");
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
        id="title"
        label={t("reminders.reminder-title")}
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        id="description"
        label={t("reminders.reminder-description")}
        variant="standard"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControl variant="standard">
        <InputLabel id="reminder-priority-label">
          {t("reminders.reminder-priority")}
        </InputLabel>
        <Select
          labelId="reminder-priority-label"
          id="reminder-priority"
          value={priority}
          label={t("reminders.reminder-priority")}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="low">{t("reminders.priority-low")}</MenuItem>
          <MenuItem value="medium">{t("reminders.priority-medium")}</MenuItem>
          <MenuItem value="high">{t("reminders.priority-high")}</MenuItem>
          <MenuItem value="critical">
            {t("reminders.priority-critical")}
          </MenuItem>
        </Select>
      </FormControl>
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
            slotProps={{ textField: { variant: "standard" } }}
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
            slotProps={{ textField: { variant: "standard" } }}
          />
        </LocalizationProvider>
      </FormControl>

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
