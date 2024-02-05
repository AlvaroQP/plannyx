import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PulseDot from "../../../../components/ui/pulse-dot/PulseDot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import styles from "./ProjectList.module.css";

export default function ProjectList({ projects }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("startDateAsc");
  const [sortedProjects, setSortedProjects] = useState([]);

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  const filterSelect = (
    <Select
      value={filter}
      onChange={handleFilterChange}
      sx={{ fontSize: ".85rem" }}
    >
      <MenuItem value="startDateAsc">
        {t("project.start-date")}{" "}
        <ArrowUpwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
      <MenuItem value="startDateDesc">
        {t("project.start-date")}{" "}
        <ArrowDownwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
      <MenuItem value="endDateAsc">
        {t("project.end-date")}{" "}
        <ArrowUpwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
      <MenuItem value="endDateDesc">
        {t("project.end-date")}{" "}
        <ArrowDownwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
      <MenuItem value="priorityAsc">
        {t("project.priority")}{" "}
        <ArrowUpwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
      <MenuItem value="priorityDesc">
        {t("project.priority")}{" "}
        <ArrowDownwardIcon
          sx={{ fontSize: ".85rem", ml: ".25rem", mt: ".25rem" }}
        />
      </MenuItem>
    </Select>
  );

  const priorityMap = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  };

  useEffect(() => {
    let sorted = [...projects];

    if (filter === "startDateAsc") {
      sorted.sort((a, b) => a.startDate.toDate() - b.startDate.toDate());
    } else if (filter === "startDateDesc") {
      sorted.sort((a, b) => b.startDate.toDate() - a.startDate.toDate());
    } else if (filter === "endDateAsc") {
      sorted.sort((a, b) => {
        if (a.endDate === null) return 1;
        if (b.endDate === null) return -1;
        return a.endDate.toDate() - b.endDate.toDate();
      });
    } else if (filter === "endDateDesc") {
      sorted.sort((a, b) => {
        if (a.endDate === null) return -1;
        if (b.endDate === null) return 1;
        return b.endDate.toDate() - a.endDate.toDate();
      });
    } else if (filter === "priorityAsc") {
      sorted.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
    } else if (filter === "priorityDesc") {
      sorted.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
    }

    setSortedProjects(sorted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, projects]);

  return (
    <div className={styles["project-list-container"]}>
      {filterSelect}

      {sortedProjects.map((project, index) => {
        let statusClassName;
        if (project.status === "not started") {
          statusClassName = styles["project-list-status-not-started"];
        } else if (project.status === "in progress") {
          statusClassName = styles["project-list-status-in-progress"];
        } else if (project.status === "finished") {
          statusClassName = styles["project-list-status-finished"];
        } else if (project.status === "stuck") {
          statusClassName = styles["project-list-status-stuck"];
        }

        return (
          <List
            onClick={() => navigate(`/user-panel/projects/${project.id}`)}
            className={`${styles["project-list"]} ${statusClassName}`}
            key={index}
            sx={{
              m: "1rem auto",
            }}
          >
            <ListItem>
              <div className={styles["project-list-info-container"]}>
                <p className={styles["project-list-name"]}>{project.name}</p>
                <div className={styles["flex-container"]}>
                  <div>
                    <p className={styles["project-list-date"]}>
                      <span className={styles["span-bold"]}>
                        {t("project.start-date")}
                      </span>
                      : {project.startDate.toDate().toLocaleDateString()}
                    </p>
                    <p className={styles["project-list-date"]}>
                      <span className={styles["span-bold"]}>
                        {t("project.end-date")}:{" "}
                      </span>
                      {project.endDate
                        ? project.endDate.toDate().toLocaleDateString()
                        : t("project.end-date-not-specified")}
                    </p>
                  </div>
                  <div>
                    <p className={styles["project-list-created-at"]}>
                      <span className={styles["span-bold"]}>
                        {t("project.created-at")}
                      </span>
                      : {project.createdAt.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={styles["flex-container"]}>
                  <div className={styles["project-list-status"]}>
                    <span className={styles["span-bold"]}>
                      {t("project.status")}
                    </span>
                    :&nbsp;
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
                  <div className={styles["project-list-priority"]}>
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
                </div>
              </div>
            </ListItem>
          </List>
        );
      })}
    </div>
  );
}
