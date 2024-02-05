import React, { useState } from "react";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import CustomDivider from "../../../../../components/ui/divider/CustomDivider";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import CustomButton from "../../../../../components/ui/button/CustomButton";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dateFormat from "../../../../../utils/dateFormat";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PulseDot from "../../../../../components/ui/pulse-dot/PulseDot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useProjects } from "../../../../../context/projects/ProjectsProvider";
import { Alert } from "@mui/material";
import { useLoading } from "../../../../../context/loading/LoadingProvider";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import styles from "./ProjectDetailsContainer.module.css";

export default function ProjectDetailsContainer({ project }) {
  const { t } = useTranslation();
  const [editedField, setEditedField] = useState(null);
  const [editedProject, setEditedProject] = useState(project);
  const [validField, setValidField] = useState(true);
  const [isDateAlertOpen, setIsDateAlertOpen] = useState(false);
  const { setIsLoading } = useLoading();
  const { putProject } = useProjects();

  function handleCancel() {
    setEditedField(null);
    setEditedProject(project);
    setValidField(true);
    setIsDateAlertOpen(false);
  }

  async function handleSave() {
    setIsLoading(true);

    if (JSON.stringify(editedProject) === JSON.stringify(project)) {
      setEditedField(null);
      setIsLoading(false);
      setIsDateAlertOpen(false);
      setValidField(true);
      console.log("No changes to save");
      return;
    }

    if (
      dayjs(editedProject.startDate.toDate()).isAfter(
        dayjs(editedProject.endDate.toDate())
      )
    ) {
      setIsLoading(false);
      setIsDateAlertOpen(true);
      return;
    }

    if (validateField(editedField, editedProject[editedField])) {
      setEditedField(null);
      setValidField(true);

      try {
        const project = {
          ...editedProject,
          startDate: Timestamp.fromDate(editedProject.startDate.toDate()),
          endDate: editedProject.endDate
            ? Timestamp.fromDate(editedProject.endDate.toDate())
            : null,
        };

        await putProject(editedProject.id, project);
      } catch (error) {
        console.error("Error saving project:", error);
      } finally {
        setIsLoading(false);
        setIsDateAlertOpen(false);
      }
    } else {
      setValidField(false);
      setIsLoading(false);
      setIsDateAlertOpen(false);
    }
  }

  function validateField(field, value) {
    if (field === "name" || field === "description") {
      return typeof value === "string" && value.trim() !== "";
    } else if (field === "startDate") {
      return value !== null;
    } else if (field === "priority") {
      const allowedValues = ["low", "medium", "high", "critical"];
      return allowedValues.includes(value);
    } else if (field === "status") {
      const allowedValues = ["not started", "in progress", "finished", "stuck"];
      return allowedValues.includes(value);
    } else {
      // If the field is not recognized, don't validate it
      return true;
    }
  }

  return (
    <div className={styles["project-details-container"]}>
      {!validField && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {t("new-project.please-fill-all-fields")}
        </Alert>
      )}

      {isDateAlertOpen && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {t("new-project.end-date-after-start-date")}
        </Alert>
      )}

      {editedField === "name" ? (
        <TextField
          value={editedProject.name}
          onChange={(e) =>
            setEditedProject({ ...editedProject, name: e.target.value })
          }
        />
      ) : (
        <h2
          onClick={() => setEditedField("name")}
          className={styles["project-details-name"]}
        >
          {project.name}
        </h2>
      )}

      {editedField === "description" ? (
        <TextField
          multiline
          fullWidth
          value={editedProject.description}
          onChange={(e) =>
            setEditedProject({ ...editedProject, description: e.target.value })
          }
        />
      ) : (
        <div
          className={styles["project-details-description"]}
          onClick={() => setEditedField("description")}
        >
          {project.description}
        </div>
      )}

      <CustomDivider />

      <div className={styles["project-details-flex-container"]}>
        <div className={styles["project-details-dates"]}>
          {editedField === "startDate" ? (
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label={t("new-project.start-date")}
                  inputFormat={dateFormat()}
                  value={
                    editedField === "startDate"
                      ? editedProject.startDate
                      : project.startDate
                  }
                  onChange={(value) => {
                    setEditedProject({ ...editedProject, startDate: value });
                  }}
                  slotProps={{ textField: { variant: "filled" } }}
                />
              </LocalizationProvider>
            </div>
          ) : (
            <div
              className={styles["project-details-start-date"]}
              onClick={() => setEditedField("startDate")}
            >
              <span className={styles["span-bold"]}>
                {t("project.start-date")}:{" "}
              </span>
              {project.startDate.toDate().toLocaleDateString()}
            </div>
          )}

          {editedField === "endDate" ? (
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label={t("new-project.end-date")}
                  inputFormat={dateFormat()}
                  value={
                    editedField === "endDate"
                      ? editedProject.endDate
                      : project.endDate
                  }
                  onChange={(value) => {
                    setEditedProject({ ...editedProject, endDate: value });
                  }}
                  slotProps={{ textField: { variant: "filled" } }}
                />
              </LocalizationProvider>
            </div>
          ) : (
            <div
              className={styles["project-details-end-date"]}
              onClick={() => setEditedField("endDate")}
            >
              <span className={styles["span-bold"]}>
                {t("project.end-date")}:{" "}
              </span>
              {project.endDate
                ? project.endDate.toDate().toLocaleDateString()
                : t("project.end-date-not-specified")}
            </div>
          )}
        </div>

        <div className={styles["project-details-priority-status-container"]}>
          <div className={styles["project-list-priority"]}>
            {editedField === "priority" ? (
              <FormControl variant="filled" sx={{ background: "#fff" }}>
                <InputLabel id="priority-select-label">
                  {t("new-project.priority")}
                </InputLabel>
                <Select
                  labelId="priority-select-label"
                  id="priority-label"
                  value={editedProject ? editedProject.priority : ""}
                  label={t("new-project.project-priority")}
                  onChange={(event) =>
                    setEditedProject({
                      ...editedProject,
                      priority: event.target.value,
                    })
                  }
                >
                  <MenuItem value="low">
                    <span className={styles["low-priority-text"]}>
                      <SignalCellular1BarIcon
                        className={styles["priority-icon-low"]}
                      />
                      {t("new-project.low-priority")}
                    </span>
                  </MenuItem>
                  <MenuItem value="medium">
                    <span className={styles["medium-priority-text"]}>
                      <SignalCellular2BarIcon
                        className={styles["priority-icon-medium"]}
                      />
                      {t("new-project.medium-priority")}
                    </span>
                  </MenuItem>
                  <MenuItem value="high">
                    <span className={styles["high-priority-text"]}>
                      <SignalCellular3BarIcon
                        className={styles["priority-icon-high"]}
                      />
                      {t("new-project.high-priority")}
                    </span>
                  </MenuItem>
                  <MenuItem value="critical">
                    <span className={styles["critical-priority-text"]}>
                      <SignalCellularConnectedNoInternet4BarIcon
                        className={styles["priority-icon-critical"]}
                      />
                      {t("new-project.critical-priority")}
                    </span>
                  </MenuItem>
                </Select>
              </FormControl>
            ) : (
              <div
                className={styles["project-details-priority"]}
                onClick={() => setEditedField("priority")}
              >
                {project.priority === "low" && (
                  <span className={styles["priority-low"]}>
                    <span className={styles["span-bold"]}>
                      {t("project.priority-low")}
                    </span>
                    <SignalCellular1BarIcon
                      sx={{ ml: ".35rem", fontSize: "1rem" }}
                    />
                  </span>
                )}
                {project.priority === "medium" && (
                  <span className={styles["priority-medium"]}>
                    <span className={styles["span-bold"]}>
                      {t("project.priority-medium")}
                    </span>
                    <SignalCellular2BarIcon
                      sx={{ ml: ".35rem", fontSize: "1rem" }}
                    />
                  </span>
                )}
                {project.priority === "high" && (
                  <span className={styles["priority-high"]}>
                    <span className={styles["span-bold"]}>
                      {t("project.priority-high")}
                    </span>
                    <SignalCellular3BarIcon
                      sx={{ ml: ".35rem", fontSize: "1rem" }}
                    />
                  </span>
                )}
                {project.priority === "critical" && (
                  <span className={styles["priority-critical"]}>
                    <span className={styles["span-bold"]}>
                      {t("project.priority-critical")}
                    </span>
                    <SignalCellularConnectedNoInternet4BarIcon
                      sx={{ ml: ".35rem", fontSize: "1rem" }}
                    />
                  </span>
                )}
              </div>
            )}
          </div>

          <div className={styles["project-list-status"]}>
            {editedField === "status" ? (
              <FormControl variant="filled" sx={{ background: "#fff" }}>
                <InputLabel id="status-select-label">
                  {t("project.status")}
                </InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-label"
                  value={editedProject ? editedProject.status : ""}
                  label={t("new-project.project-status")}
                  onChange={(event) =>
                    setEditedProject({
                      ...editedProject,
                      status: event.target.value,
                    })
                  }
                >
                  <MenuItem value="not started">
                    <span>{t("project.status-not-started")}</span>
                    <RemoveCircleOutlineIcon
                      sx={{ ml: ".35rem", fontSize: "1rem" }}
                    />
                  </MenuItem>
                  <MenuItem value="in progress">
                    <span>{t("project.status-in-progress")} &nbsp;</span>
                    <PulseDot />
                  </MenuItem>
                  <MenuItem value="finished">
                    <span>{t("project.status-finished")}</span>
                    <CheckCircleIcon
                      sx={{ ml: ".35rem", color: "#3071d4", fontSize: "1rem" }}
                    />
                  </MenuItem>
                  <MenuItem value="stuck">
                    <span>{t("project.status-stuck")}</span>
                    <ErrorIcon
                      sx={{ ml: ".35rem", color: "#dc3545", fontSize: "1rem" }}
                    />
                  </MenuItem>
                </Select>
              </FormControl>
            ) : (
              <div
                className={styles["project-details-status"]}
                onClick={() => setEditedField("status")}
              >
                <span className={styles["span-bold"]}>
                  {t("project.status")}: &nbsp;
                </span>
                {project.status === "not started" && (
                  <>
                    <span>{t("project.status-not-started")}</span>
                    <RemoveCircleOutlineIcon
                      sx={{ ml: ".35rem", fontSize: "1rem" }}
                    />
                  </>
                )}
                {project.status === "in progress" && (
                  <>
                    <span className={styles["status-in-progress-span"]}>
                      {t("project.status-in-progress")}
                    </span>
                    <PulseDot />
                  </>
                )}
                {project.status === "finished" && (
                  <>
                    <span>{t("project.status-finished")}</span>
                    <CheckCircleIcon
                      sx={{
                        ml: ".35rem",
                        color: "#3071d4",
                        fontSize: "1rem",
                      }}
                    />
                  </>
                )}
                {project.status === "stuck" && (
                  <>
                    <span>{t("project.status-stuck")}</span>
                    <ErrorIcon
                      sx={{
                        ml: ".35rem",
                        color: "#dc3545",
                        fontSize: "1rem",
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {editedField && (
        <div className={styles["edit-project-buttons-container"]}>
          <CustomButton
            text={t("button.cancel")}
            variant="outlined"
            color="error"
            onClick={() => handleCancel()}
          />

          <CustomButton
            text={t("button.save")}
            variant="contained"
            color="primary"
            onClick={() => handleSave()}
          />
        </div>
      )}
    </div>
  );
}