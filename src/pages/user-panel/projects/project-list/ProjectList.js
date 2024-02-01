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
import styles from "./ProjectList.module.css";

export default function ProjectList({ projects }) {
  const { t } = useTranslation();

  return (
    <div className={styles["project-list-container"]}>
      {projects.map((project, index) => (
        <List
          className={styles["project-list"]}
          key={index}
          sx={{
            m: "1rem",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                sx={{
                  background: "#3071d4",
                  width: "2rem",
                  height: "2rem",
                  fontSize: "1rem",
                }}
              >
                {index + 1}
              </Avatar>
            </ListItemAvatar>
            <div className={styles["project-list-info-container"]}>
              <p className={styles["project-list-name"]}>{project.name}</p>
              {project.endDate ? (
                <p className={styles["project-list-date"]}>
                  <span className={styles["span-bold"]}>
                    {t("project.start-date")}
                  </span>
                  : {project.startDate.toDate().toLocaleDateString()} - {""}
                  <span className={styles["span-bold"]}>
                    {t("project.end-date")}:{" "}
                  </span>
                  {project.endDate.toDate().toLocaleDateString()}
                </p>
              ) : (
                <p className={styles["project-list-date"]}>
                  <span className={styles["span-bold"]}>
                    {t("project.start-date")}:{" "}
                  </span>
                  {project.startDate.toDate().toLocaleDateString()}
                </p>
              )}
              <div className={styles["project-list-status"]}>
                <span className={styles["span-bold"]}>
                  {t("project.status")}
                </span>
                :&nbsp;
                {project.status === "not started" && (
                  <>
                    <span className={styles["project-list-status-not-started"]}>
                      {t("project.status-not-started")}
                    </span>
                    <RemoveCircleOutlineIcon
                      sx={{ ml: ".35rem", fontSize: "1rem" }}
                    />
                  </>
                )}
                {project.status === "in progress" && (
                  <>
                    <span className={styles["project-list-status-in-progress"]}>
                      {t("project.status-in-progress")}
                    </span>
                    <PulseDot />
                  </>
                )}
                {project.status === "finished" && (
                  <>
                    <span className={styles["project-list-status-finished"]}>
                      {t("project.status-finished")}
                    </span>
                    <CheckCircleIcon
                      sx={{ ml: ".35rem", color: "#3071d4", fontSize: "1rem" }}
                    />
                  </>
                )}
                {project.status === "stuck" && (
                  <>
                    <span className={styles["project-list-status-stuck"]}>
                      {t("project.status-stuck")}
                    </span>
                    <ErrorIcon
                      sx={{ ml: ".35rem", color: "#dc3545", fontSize: "1rem" }}
                    />
                  </>
                )}
              </div>
            </div>
          </ListItem>
        </List>
      ))}
    </div>
  );
}
