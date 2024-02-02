import React from "react";
import { useTranslation } from "react-i18next";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useProjects } from "../../../../context/projects/ProjectsProvider";
import CustomButton from "../../../../components/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ProjectList from "../project-list/ProjectList";
import CustomScrollableTabs from "../../../../components/ui/tabs/CustomScrollableTabs";
import styles from "./ProjectsContainer.module.css";

export default function AllProjectsContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projects } = useProjects();

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.my-projects")} />
      <div className={styles["all-projects-container"]}>
        {projects.length > 0 ? (
          <CustomScrollableTabs
            tabs={[
              {
                id: 1,
                name: t("project.all-projects"),
                content: <ProjectList projects={projects} />,
              },
              {
                id: 2,
                name: t("project.status-not-started"),
                content: (
                  <ProjectList
                    projects={projects.filter(
                      (project) => project.status === "not started"
                    )}
                  />
                ),
              },
              {
                id: 3,
                name: t("project.status-in-progress"),
                content: (
                  <ProjectList
                    projects={projects.filter(
                      (project) => project.status === "in progress"
                    )}
                  />
                ),
              },
              {
                id: 4,
                name: t("project.status-finished"),
                content: (
                  <ProjectList
                    projects={projects.filter(
                      (project) => project.status === "finished"
                    )}
                  />
                ),
              },
              {
                id: 5,
                name: t("project.status-stuck"),
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
            {t("projects-list.no-projects")}

            <CustomButton
              variant="contained"
              color="primary"
              text={t("button.new-project")}
              icon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/user-panel/projects/new")}
            />
          </div>
        )}
      </div>
    </>
  );
}
