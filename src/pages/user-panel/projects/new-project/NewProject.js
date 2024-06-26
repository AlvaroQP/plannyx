import React, { useState } from "react";
import styles from "./NewProject.module.css";
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
import { useProjects } from "../../../../context/projects/ProjectsProvider";
import { useDialog } from "../../../../context/dialog/DialogProvider";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import dayjs from "dayjs";
import { useLanguage } from "../../../../context/language/LanguageProvider";
import "dayjs/locale/en-gb";
import "dayjs/locale/es";

export default function NewProject() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { postProject, getAllProjects } = useProjects();
  const { openDialog } = useDialog();
  const { setIsLoading } = useLoading();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStartDate, setProjectStartDate] = useState(null);
  const [projectEndDate, setProjectEndDate] = useState(null);
  const [projectPriority, setProjectPriority] = useState("");
  const [isEndDateKnown, setIsEndDateKnown] = useState(true);
  const [validForm, setValidForm] = useState(true);
  const [isDateAlertOpen, setIsDateAlertOpen] = useState(false);

  function handleReset() {
    setProjectName("");
    setProjectDescription("");
    setProjectStartDate(null);
    setProjectEndDate(null);
    setProjectPriority("");
    setIsEndDateKnown(true);
    setValidForm(true);
    setIsDateAlertOpen(false);
  }

  async function handleSubmit(e) {
    setValidForm(true);
    setIsLoading(true);
    e.preventDefault();

    if (
      projectName === "" ||
      projectDescription === "" ||
      projectStartDate === null ||
      (isEndDateKnown && projectEndDate === null) ||
      projectPriority === ""
    ) {
      setValidForm(false);
      setIsLoading(false);
    } else if (
      isEndDateKnown &&
      dayjs(projectStartDate).isAfter(projectEndDate)
    ) {
      setIsDateAlertOpen(true);
      setIsLoading(false);
    } else {
      const project = {
        name: projectName,
        description: projectDescription,
        startDate: Timestamp.fromDate(projectStartDate.toDate()),
        endDate: isEndDateKnown
          ? Timestamp.fromDate(projectEndDate.toDate())
          : null,
        priority: projectPriority,
        status: "not started",
        createdAt: Timestamp.now(),
      };

      try {
        await postProject(project);
        await getAllProjects();
        openDialog({
          title: t("new-project.success"),
          description: t("new-project.project-added"),
          severity: "success",
        });
        navigate("/user-panel/projects/all");
      } catch (error) {
        console.error(error);
        openDialog({
          title: t("new-project.error"),
          description: t("new-project.could-not-add-project"),
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
    <div className={styles["new-project-container"]}>
      <form onSubmit={handleSubmit} className={styles["new-project-form"]}>
        {!validForm && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {t("new-project.please-fill-all-fields")}
          </Alert>
        )}

        {isDateAlertOpen && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {t("new-project.end-date-after-start-date")}
          </Alert>
        )}

        <TextField
          required
          value={projectName}
          label={t("new-project.project-name")}
          sx={{ mb: 4, background: "#fff" }}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <TextField
          required
          value={projectDescription}
          multiline
          label={t("new-project.project-description")}
          sx={{ mb: 3, background: "#fff" }}
          onChange={(e) => setProjectDescription(e.target.value)}
        />

        <div className={styles["switch-container"]}>
          {t("new-project.specify-end-date")}

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
              label={t("new-project.start-date") + " *"}
              inputFormat={dateFormat()}
              value={projectStartDate}
              onChange={(value) => {
                setProjectStartDate(value);
              }}
              slotProps={{ textField: {} }}
              sx={{ background: "#fff" }}
            />

            {isEndDateKnown && (
              <DatePicker
                required
                className={styles["date-picker-half-width"]}
                label={t("new-project.end-date") + " *"}
                inputFormat={dateFormat()}
                value={isEndDateKnown ? projectEndDate : null}
                onChange={(value) => {
                  setProjectEndDate(value);
                }}
                slotProps={{ textField: {} }}
                sx={{ background: "#fff" }}
              />
            )}
          </LocalizationProvider>
        </div>

        <FormControl sx={{ background: "#fff" }} required>
          <InputLabel id="priority-select-label">
            {t("new-project.priority")}
          </InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-label"
            required
            value={projectPriority}
            label={t("new-project.project-priority")}
            onChange={(e) => setProjectPriority(e.target.value)}
          >
            <MenuItem value="low">
              <span className={styles["low-priority-text"]}>
                <SignalCellular1BarIcon
                  className={styles["priority-icon-low"]}
                  sx={{ fontSize: "1.2rem" }}
                />
                {t("new-project.low-priority")}
              </span>
            </MenuItem>
            <MenuItem value="medium">
              <span className={styles["medium-priority-text"]}>
                <SignalCellular2BarIcon
                  className={styles["priority-icon-medium"]}
                  sx={{ fontSize: "1.2rem" }}
                />
                {t("new-project.medium-priority")}
              </span>
            </MenuItem>
            <MenuItem value="high">
              <span className={styles["high-priority-text"]}>
                <SignalCellular3BarIcon
                  className={styles["priority-icon-high"]}
                  sx={{ fontSize: "1.2rem" }}
                />
                {t("new-project.high-priority")}
              </span>
            </MenuItem>
            <MenuItem value="critical">
              <span className={styles["critical-priority-text"]}>
                <SignalCellularConnectedNoInternet4BarIcon
                  className={styles["priority-icon-critical"]}
                  sx={{ fontSize: "1.2rem" }}
                />
                {t("new-project.critical-priority")}
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
