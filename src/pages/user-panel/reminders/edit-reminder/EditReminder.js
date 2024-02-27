import React, { useState, useEffect } from "react";
import styles from "./EditReminder.module.css";
import { useTranslation } from "react-i18next";
import { useReminders } from "../../../../context/reminders/RemindersProvider";
import { useLanguage } from "../../../../context/language/LanguageProvider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import {
  TimePicker,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import dayjs from "dayjs";
import dateFormat from "../../../../utils/dateFormat";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CasinoIcon from "@mui/icons-material/Casino";
import FlightIcon from "@mui/icons-material/Flight";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomButton from "../../../../components/ui/button/CustomButton";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { Timestamp } from "firebase/firestore";
import { useDialog } from "../../../../context/dialog/DialogProvider";

export default function EditReminder({
  initialReminder,
  handleCloseEditDialog,
}) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [title, setTitle] = useState(initialReminder?.title);
  const [notes, setNotes] = useState(initialReminder?.notes);
  const [date, setDate] = useState(
    initialReminder?.date ? dayjs.unix(initialReminder?.date.seconds) : null
  );
  const [time, setTime] = useState(
    initialReminder?.time ? dayjs(`1970-01-01T${initialReminder?.time}`) : null
  );
  const [category, setCategory] = useState(initialReminder?.category);
  const [priority, setPriority] = useState(initialReminder?.priority);
  const [validForm, setValidForm] = useState(true);
  const { setIsLoading } = useLoading();
  const { putReminder, getAllReminders } = useReminders();
  const { openDialog } = useDialog();

  useEffect(() => {
    console.log("initialReminder", initialReminder);
  }, [initialReminder]);

  async function handleSaveReminder(e) {
    e.preventDefault();
    setValidForm(true);
    setIsLoading(true);

    if (
      title === "" ||
      date === null ||
      time === null ||
      category === "" ||
      priority === "" ||
      !dayjs(date, "YYYY-MM-DD").isValid() ||
      !dayjs(time, "HH:mm").isValid()
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
      date: Timestamp.fromDate(date.toDate()),
      time: time ? time.format("HH:mm") : null,
    };

    try {
      await putReminder(initialReminder.id, reminder);
      await getAllReminders();
      openDialog({
        title: t("reminders.reminder-success"),
        description: t("reminders.reminder-edited"),
        severity: "success",
      });
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating reminder", error);
      openDialog({
        title: t("reminders.reminder-error"),
        description: t("reminders.reminder-not-edited"),
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={initialReminder !== null} onClose={handleCloseEditDialog}>
      <DialogTitle sx={{ mb: 1, textAlign: "center" }}>
        {t("reminders.edit-reminder")}
      </DialogTitle>

      {!validForm && (
        <Alert severity="error" sx={{ m: "0rem 1.5rem" }}>
          {t("new-project.please-fill-all-fields")}
        </Alert>
      )}

      <DialogContent>
        <form onSubmit={handleSaveReminder}>
          <TextField
            label={t("reminders.reminder-title")}
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ mt: "1rem", mb: "1rem" }}
            required
          />
          <TextField
            label={t("reminders.reminder-notes")}
            value={notes || ""}
            fullWidth
            multiline
            rows={4}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ m: "1rem 0" }}
          />

          <div className={styles["date-time-container"]}>
            <FormControl variant="standard" sx={{ width: "49%" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={dayjs.locale(language)}
              >
                <DatePicker
                  labelId="reminder-date-label"
                  id="reminder-date"
                  inputFormat={dateFormat()}
                  label={t("reminders.reminder-date")}
                  value={date}
                  onChange={(date) => setDate(date)}
                  slotProps={{ textField: { required: true } }}
                  sx={{ background: "#fff" }}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl variant="standard" sx={{ width: "49%" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={dayjs.locale(language)}
              >
                <TimePicker
                  label={t("reminders.reminder-time")}
                  value={time}
                  onChange={(newTime) => {
                    setTime(newTime);
                  }}
                  fullWidth
                  slotProps={{ textField: { required: true } }}
                  sx={{ mb: "1rem" }}
                />
              </LocalizationProvider>
            </FormControl>
          </div>

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
                    <WorkIcon sx={{ fontSize: "1.2rem", color: "#a96730" }} />
                    {t("reminders.category-work")}
                  </span>
                </MenuItem>
                <MenuItem value="personal">
                  <span className={styles["category-text"]}>
                    <PersonIcon sx={{ fontSize: "1.2rem", color: "#1970c2" }} />
                    {t("reminders.category-personal")}
                  </span>
                </MenuItem>
                <MenuItem value="health">
                  <span className={styles["category-text"]}>
                    <LocalHospitalIcon
                      sx={{ fontSize: "1.2rem", color: "#cd2121" }}
                    />
                    {t("reminders.category-health")}
                  </span>
                </MenuItem>
                <MenuItem value="education">
                  <span className={styles["category-text"]}>
                    <SchoolIcon sx={{ fontSize: "1.2rem", color: "#55853a" }} />
                    {t("reminders.category-education")}
                  </span>
                </MenuItem>
                <MenuItem value="finance">
                  <span className={styles["category-text"]}>
                    <AccountBalanceIcon
                      sx={{ fontSize: "1.2rem", color: "#b5960a" }}
                    />
                    {t("reminders.category-finance")}
                  </span>
                </MenuItem>
                <MenuItem value="shopping">
                  <span className={styles["category-text"]}>
                    <ShoppingCartIcon
                      sx={{ fontSize: "1.2rem", color: "#d4634f" }}
                    />
                    {t("reminders.category-shopping")}
                  </span>
                </MenuItem>
                <MenuItem value="sports">
                  <span className={styles["category-text"]}>
                    <SportsSoccerIcon
                      sx={{ fontSize: "1.2rem", color: "#4f6b93" }}
                    />
                    {t("reminders.category-sports")}
                  </span>
                </MenuItem>
                <MenuItem value="entertainment">
                  <span className={styles["category-text"]}>
                    <CasinoIcon sx={{ fontSize: "1.2rem", color: "#c42256" }} />
                    {t("reminders.category-entertainment")}
                  </span>
                </MenuItem>
                <MenuItem value="travel">
                  <span className={styles["category-text"]}>
                    <FlightIcon sx={{ fontSize: "1.2rem", color: "#4f4fc4" }} />
                    {t("reminders.category-travel")}
                  </span>
                </MenuItem>
                <MenuItem value="family">
                  <span className={styles["category-text"]}>
                    <FamilyRestroomIcon
                      sx={{ fontSize: "1.2rem", color: "#9b6b5b" }}
                    />
                    {t("reminders.category-family")}
                  </span>
                </MenuItem>
                <MenuItem value="other">
                  <span className={styles["category-text"]}>
                    <MoreHorizIcon
                      sx={{ fontSize: "1.2rem", color: "#4f4fc4" }}
                    />
                    {t("reminders.category-other")}
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
                value={priority || "low"}
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

          <div className={styles.buttonsContainer}>
            <CustomButton
              text={t("button.cancel")}
              onClick={() => {
                handleCloseEditDialog();
              }}
              variant="outlined"
              color="error"
            />

            <CustomButton
              type="submit"
              text={t("button.save")}
              variant="contained"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
