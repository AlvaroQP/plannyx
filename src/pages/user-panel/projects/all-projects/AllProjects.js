import React from "react";
import { useTranslation } from "react-i18next";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useProjects } from "../../../../context/projects/ProjectsProvider";
import CustomButton from "../../../../components/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styles from "./AllProjects.module.css";

export default function AllProjects() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projects } = useProjects();

  const projectsContainer = projects.map((project, index) => (
    <List
      className={styles["project-list"]}
      key={index}
      sx={{
        m: "1rem 3rem",
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
              {t("project.start-date")}:{" "}
              {project.startDate.toDate().toLocaleDateString()} - {""}
              {t("project.end-date")}:{" "}
              {project.endDate.toDate().toLocaleDateString()}
            </p>
          ) : (
            <p className={styles["project-list-date"]}>
              {project.startDate.toDate().toLocaleDateString()}
            </p>
          )}
          <p className={styles["project-list-status"]}>
            {t("project.status")}: {""}
            {project.status === "not started" && (
              <span className={styles["project-list-status-not-started"]}>
                {t("project.status-not-started")}
              </span>
            )}
            {project.status === "in progress" && (
              <span className={styles["project-list-status-in-progress"]}>
                {t("project.status-in-progress")}
              </span>
            )}
            {project.status === "finished" && (
              <span className={styles["project-list-status-finished"]}>
                {t("project.status-finished")}
              </span>
            )}
            {project.status === "stuck" && (
              <span className={styles["project-list-status-stuck"]}>
                {t("project.status-stuck")}
              </span>
            )}
          </p>
        </div>
      </ListItem>
    </List>
  ));

  const noProjectsContainer = (
    <div className={styles["no-projects-container"]}>
      {t("projects-list.no-projects")}

      <CustomButton
        variant="contained"
        color="primary"
        text={t("button.new-project")}
        icon={<AddCircleOutlineIcon />}
        onClick={() => navigate("/user-panel/projects/new")}
      />
    </div>
  );

  return (
    <div className={styles["all-projects-container"]}>
      <UserPanelHeader title={t("user-panel-sidebar.my-projects")} />

      {projects.length > 0 ? (
        <div className={styles["project-list-container"]}>
          {projectsContainer}
        </div>
      ) : (
        noProjectsContainer
      )}
    </div>
  );
}
