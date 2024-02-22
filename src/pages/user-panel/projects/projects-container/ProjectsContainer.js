import React from "react";
import { useTranslation } from "react-i18next";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useProjects } from "../../../../context/projects/ProjectsProvider";
import ProjectList from "../project-list/ProjectList";
import CustomScrollableTabs from "../../../../components/ui/tabs/CustomScrollableTabs";
import styles from "./ProjectsContainer.module.css";
import NewProject from "../new-project/NewProject";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function AllProjectsContainer() {
  const { t } = useTranslation();
  const { projects } = useProjects();

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.my-projects")} />
      <div className={styles["all-projects-container"]}>
        {projects.length > 0 ? (
          <CustomScrollableTabs
            initialTabId={2}
            tabs={[
              {
                id: 1,
                name: (
                  <div className={styles["new-project-div"]}>
                    {t("project.new-project")}
                  </div>
                ),
                content: <NewProject />,
              },
              {
                id: 2,
                name: t("project.all-projects"),
                content: <ProjectList projects={projects} />,
              },
              {
                id: 3,
                name: (
                  <div className={styles["projects-status-name-container"]}>
                    <RemoveCircleOutlineIcon
                      sx={{ fontSize: "1rem", color: "#A0A0A0" }}
                    />
                    {t("project.status-not-started")}
                  </div>
                ),
                content: (
                  <ProjectList
                    projects={projects.filter(
                      (project) => project.status === "not started"
                    )}
                  />
                ),
              },
              {
                id: 4,
                name: (
                  <div className={styles["projects-status-name-container"]}>
                    <CircleIcon sx={{ fontSize: "1rem", color: "#008000" }} />
                    {t("project.status-in-progress")}
                  </div>
                ),
                content: (
                  <ProjectList
                    projects={projects.filter(
                      (project) => project.status === "in progress"
                    )}
                  />
                ),
              },
              {
                id: 5,
                name: (
                  <div className={styles["projects-status-name-container"]}>
                    <CheckCircleIcon
                      sx={{ fontSize: "1rem", color: "#3071D4" }}
                    />
                    {t("project.status-finished")}
                  </div>
                ),
                content: (
                  <ProjectList
                    projects={projects.filter(
                      (project) => project.status === "finished"
                    )}
                  />
                ),
              },
              {
                id: 6,
                name: (
                  <div className={styles["projects-status-name-container"]}>
                    <ErrorIcon sx={{ fontSize: "1rem", color: "#DC3545" }} />
                    {t("project.status-stuck")}
                  </div>
                ),
                content: (
                  <ProjectList
                    projects={projects.filter(
                      (project) => project.status === "stuck"
                    )}
                  />
                ),
              },
            ]}
          />
        ) : (
          <div className={styles["no-projects-container"]}>
            <div className={styles["no-projects-text"]}>
              {t("projects-list.no-projects")}
            </div>

            <CustomScrollableTabs
              initialTabId={1}
              tabs={[
                {
                  id: 1,
                  name: t("project.new-project"),
                  content: <NewProject />,
                },
              ]}
            />
          </div>
        )}
      </div>
    </>
  );
}
