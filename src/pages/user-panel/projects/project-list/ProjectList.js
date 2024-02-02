import React from "react";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PulseDot from "../../../../components/ui/pulse-dot/PulseDot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import styles from "./ProjectList.module.css";

export default function ProjectList({ projects }) {
  const { t } = useTranslation();

  return (
    <div className={styles["project-list-container"]}>
      {projects.map((project, index) => {
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
            className={`${styles["project-list"]} ${statusClassName}`}
            key={index}
            sx={{
              m: "1rem auto",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    background: "#3071d4",
                    width: "1.5rem",
                    height: "1.5rem",
                    fontSize: ".7rem",
                  }}
                >
                  {index + 1}
                </Avatar>
              </ListItemAvatar>
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
