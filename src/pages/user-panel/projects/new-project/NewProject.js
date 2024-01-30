import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import {
  TextField,
  Select,
  MenuItem,
  Switch,
  FormControl,
  InputLabel,
} from "@mui/material";
import projectsBanner from "../../../../assets/images/projects-banner.png";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dateFormat from "../../../../utils/dateFormat";
import CircleIcon from "@mui/icons-material/Circle";
import styles from "./NewProject.module.css";

export default function NewProject() {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStartDate, setProjectStartDate] = useState(null);
  const [projectEndDate, setProjectEndDate] = useState(null);
  const [projectPriority, setProjectPriority] = useState("");
  const [isEndDateKnown, setIsEndDateKnown] = useState(true);

  return (
    <div className={styles["new-project-container"]}>
      <UserPanelHeader title={t("user-panel-sidebar.new-project")} />

      <form className={styles["new-project-form"]}>
        <img
          className={styles["project-banner"]}
          src={projectsBanner}
          alt="projects banner"
        />

        <TextField
          required
          value={projectName}
          label={t("new-project.project-name")}
          variant="filled"
          sx={{ mb: 4, background: "#fff" }}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <TextField
          required
          value={projectDescription}
          multiline
          label={t("new-project.project-description")}
          variant="filled"
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              slotProps={{ textField: { variant: "filled" } }}
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
                slotProps={{ textField: { variant: "filled" } }}
                sx={{ background: "#fff" }}
              />
            )}
          </LocalizationProvider>
        </div>

        <FormControl variant="filled" required>
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
                <CircleIcon /> {t("new-project.low-priority")}
              </span>
            </MenuItem>
            <MenuItem value="medium">
              <span className={styles["medium-priority-text"]}>
                <CircleIcon />
                {t("new-project.medium-priority")}
              </span>
            </MenuItem>
            <MenuItem value="high">
              <span className={styles["high-priority-text"]}>
                <CircleIcon />
                {t("new-project.high-priority")}
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
}
