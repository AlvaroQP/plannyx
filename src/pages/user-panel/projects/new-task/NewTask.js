import React, { useState } from "react";
import styles from "./NewTask.module.css";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Select,
  MenuItem,
  Switch,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dateFormat from "../../../../utils/dateFormat";
import CustomButton from "../../../../components/ui/button/CustomButton";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Alert from "@mui/material/Alert";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useDialog } from "../../../../context/dialog/DialogProvider";
import { Timestamp } from "firebase/firestore";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import dayjs from "dayjs";
import { useLanguage } from "../../../../context/language/LanguageProvider";
import "dayjs/locale/en-gb";
import "dayjs/locale/es";
import { useTasks } from "../../../../context/tasks/TasksProvider";

export default function NewTask({ projectId }) {
  const { t } = useTranslation();

  const { postTask } = useTasks();
  const { language } = useLanguage();
  const { openDialog } = useDialog();
  const { setIsLoading } = useLoading();
  const [taskName, setTaskName] = useState("");
  const [taskStartDate, setTaskStartDate] = useState(null);
  const [taskEndDate, setTaskEndDate] = useState(null);
  const [taskPriority, setTaskPriority] = useState("");
  const [isEndDateKnown, setIsEndDateKnown] = useState(true);
  const [validForm, setValidForm] = useState(true);
  const [isDateAlertOpen, setIsDateAlertOpen] = useState(false);

  function handleReset() {
    setTaskName("");
    setTaskStartDate(null);
    setTaskEndDate(null);
    setTaskPriority("");
    setIsEndDateKnown(true);
    setValidForm(true);
    setIsDateAlertOpen(false);
  }

  async function handleSubmit(e) {
    setValidForm(true);
    setIsLoading(true);
    e.preventDefault();

    if (
      taskName === "" ||
      taskStartDate === null ||
      (isEndDateKnown && taskEndDate === null) ||
      taskPriority === ""
    ) {
      setValidForm(false);
      setIsLoading(false);
    } else if (isEndDateKnown && dayjs(taskStartDate).isAfter(taskEndDate)) {
      setIsDateAlertOpen(true);
      setIsLoading(false);
    } else {
      const task = {
        name: taskName,
        startDate: Timestamp.fromDate(taskStartDate.toDate()),
        endDate: isEndDateKnown
          ? Timestamp.fromDate(taskEndDate.toDate())
          : null,
        priority: taskPriority,
        status: "not started",
        createdAt: Timestamp.now(),
      };

      try {
        await postTask(projectId, task);
        openDialog({
          title: t("task.success"),
          description: t("task.task-added"),
          severity: "success",
        });
      } catch (error) {
        console.error(error);
        openDialog({
          title: t("task.error"),
          description: t("task.could-not-add-task"),
          severity: "error",
        });
      } finally {
        setValidForm(true);
        setIsDateAlertOpen(false);
        handleReset();
        setIsLoading(false);
      }
    }
  }

  return (
    <div className={styles["new-task-container"]}>
      <form onSubmit={handleSubmit} className={styles["new-task-form"]}>
        {!validForm && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {t("task.please-fill-all-fields")}
          </Alert>
        )}

        {isDateAlertOpen && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {t("task.end-date-after-start-date")}
          </Alert>
        )}

        <TextField
          required
          value={taskName}
          label={t("task.task-name")}
          sx={{ mb: 4, background: "#fff" }}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <div className={styles["switch-container"]}>
          {t("task.specify-end-date")}

          <Switch
            checked={isEndDateKnown}
            onChange={() => setIsEndDateKnown(!isEndDateKnown)}
          />
        </div>

        <div className={styles["dates-container"]}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={dayjs.locale(language)}
          >
            <DatePicker
              required
              className={
                !isEndDateKnown
                  ? styles["date-picker-full-width"]
                  : styles["date-picker-half-width"]
              }
              label={t("task.start-date") + " *"}
              inputFormat={dateFormat()}
              value={taskStartDate}
              onChange={(value) => {
                setTaskStartDate(value);
              }}
              sx={{ background: "#fff" }}
            />

            {isEndDateKnown && (
              <DatePicker
                required
                className={styles["date-picker-half-width"]}
                label={t("task.end-date") + " *"}
                inputFormat={dateFormat()}
                value={isEndDateKnown ? taskEndDate : null}
                onChange={(value) => {
                  setTaskEndDate(value);
                }}
                sx={{ background: "#fff" }}
              />
            )}
          </LocalizationProvider>
        </div>

        <FormControl sx={{ background: "#fff" }} required>
          <InputLabel id="priority-select-label">
            {t("task.priority")}
          </InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-label"
            required
            value={taskPriority}
            label={t("task.priority")}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <MenuItem value="low">
              <span className={styles["low-priority-text"]}>
                <SignalCellular1BarIcon
                  className={styles["priority-icon-low"]}
                />
                {t("task.low-priority")}
              </span>
            </MenuItem>
            <MenuItem value="medium">
              <span className={styles["medium-priority-text"]}>
                <SignalCellular2BarIcon
                  className={styles["priority-icon-medium"]}
                />
                {t("task.medium-priority")}
              </span>
            </MenuItem>
            <MenuItem value="high">
              <span className={styles["high-priority-text"]}>
                <SignalCellular3BarIcon
                  className={styles["priority-icon-high"]}
                />
                {t("task.high-priority")}
              </span>
            </MenuItem>
            <MenuItem value="critical">
              <span className={styles["critical-priority-text"]}>
                <SignalCellularConnectedNoInternet4BarIcon
                  className={styles["priority-icon-critical"]}
                />
                {t("task.critical-priority")}
              </span>
            </MenuItem>
          </Select>
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
    </div>
  );
}
