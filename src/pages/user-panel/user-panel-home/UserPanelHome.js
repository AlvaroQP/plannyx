import React, { useState, useEffect, useCallback } from "react";
import styles from "./UserPanelHome.module.css";
import UserPanelHeader from "../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../auth/auth-context/AuthProvider";
import { useProjects } from "../../../context/projects/ProjectsProvider";
import CustomButton from "../../../components/ui/button/CustomButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CustomDivider from "../../../components/ui/divider/CustomDivider";
import { useNavigate } from "react-router-dom";

export default function UserPanelHome() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [projectsStartingToday, setProjectsStartingToday] = useState([]);
  const [projectsEndingToday, setProjectsEndingToday] = useState([]);
  const [projectsStartingSoon, setProjectsStartingSoon] = useState([]);
  const [projectsEndingSoon, setProjectsEndingSoon] = useState([]);

  const getProjectsStartingToday = useCallback(async () => {
    const today = new Date();
    const projectsStartingToday = projects.filter((project) => {
      if (project.startDate === null) {
        return false;
      }
      const projectStartDate = project.startDate.toDate();
      return (
        projectStartDate.getDate() === today.getDate() &&
        projectStartDate.getMonth() === today.getMonth() &&
        projectStartDate.getFullYear() === today.getFullYear()
      );
    });
    setProjectsStartingToday(projectsStartingToday);
  }, [projects]);

  const getProjectsEndingToday = useCallback(async () => {
    const today = new Date();
    const projectsEndingToday = projects.filter((project) => {
      if (project.endDate === null) {
        return false;
      }
      const projectEndDate = project.endDate.toDate();
      return (
        projectEndDate.getDate() === today.getDate() &&
        projectEndDate.getMonth() === today.getMonth() &&
        projectEndDate.getFullYear() === today.getFullYear()
      );
    });
    setProjectsEndingToday(projectsEndingToday);
  }, [projects]);

  const getProjectsStartingSoon = useCallback(async () => {
    const today = new Date();
    const projectsStartingSoon = projects.filter((project) => {
      if (project.startDate === null) {
        return false;
      }
      const projectStartDate = project.startDate.toDate();
      const timeDifference = projectStartDate.getTime() - today.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference <= 7 && daysDifference >= 0;
    });
    setProjectsStartingSoon(projectsStartingSoon);
  }, [projects]);

  const getProjectsEndingSoon = useCallback(async () => {
    const today = new Date();
    const projectsEndingSoon = projects.filter((project) => {
      if (project.endDate === null) {
        return false;
      }
      const projectEndDate = project.endDate.toDate();
      const timeDifference = projectEndDate.getTime() - today.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference <= 7 && daysDifference >= 0;
    });
    setProjectsEndingSoon(projectsEndingSoon);
  }, [projects]);

  useEffect(() => {
    getProjectsStartingToday();
    getProjectsEndingToday();
    getProjectsStartingSoon();
    getProjectsEndingSoon();
  }, [
    getProjectsStartingToday,
    getProjectsEndingToday,
    getProjectsStartingSoon,
    getProjectsEndingSoon,
  ]);

  return (
    <>
      <UserPanelHeader title={`${t("login.welcome")}, ${user.displayName}`} />
      <div className={styles["user-panel-home"]}>
        {projectsStartingToday.length > 0 && (
          <div className={styles["user-panel-background-wrapper"]}>
            <h2 className={styles["projects-title"]}>
              {t("projects-notifications.starting-today")}
            </h2>
            <CustomDivider />
            <div className={styles["projects-container"]}>
              {projectsStartingToday.map((project, index) => (
                <div key={index} className={styles["project"]}>
                  <div
                    onClick={() =>
                      navigate(`/user-panel/projects/${project.id}`)
                    }
                    className={`${styles["project-name-container"]} ${styles["project-name-container-starting-today"]}`}
                  >
                    {project.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projectsEndingToday.length > 0 && (
          <div className={styles["user-panel-background-wrapper"]}>
            <h2 className={styles["projects-title"]}>
              {t("projects-notifications.ending-today")}
            </h2>
            <CustomDivider />
            <div className={styles["projects-container"]}>
              {projectsEndingToday.map((project, index) => (
                <div key={index} className={styles["project"]}>
                  <div
                    onClick={() =>
                      navigate(`/user-panel/projects/${project.id}`)
                    }
                    className={`${styles["project-name-container"]} ${styles["project-name-container-ending-today"]}`}
                  >
                    {project.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projectsStartingSoon.length > 0 && (
          <div className={styles["user-panel-background-wrapper"]}>
            <h2 className={styles["projects-title"]}>
              {t("projects-notifications.starting-soon")}
            </h2>
            <CustomDivider />
            <div className={styles["projects-container"]}>
              {projectsStartingSoon.map((project, index) => (
                <div key={index} className={styles["project"]}>
                  <div
                    onClick={() =>
                      navigate(`/user-panel/projects/${project.id}`)
                    }
                    className={`${styles["project-name-container"]} ${styles["project-name-container-starting-soon"]}`}
                  >
                    {project.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projectsEndingSoon.length > 0 && (
          <div className={styles["user-panel-background-wrapper"]}>
            <h2 className={styles["projects-title"]}>
              {t("projects-notifications.ending-soon")}
            </h2>
            <CustomDivider />
            <div className={styles["projects-container"]}>
              {projectsEndingSoon.map((project, index) => (
                <div key={index} className={styles["project"]}>
                  <div
                    onClick={() =>
                      navigate(`/user-panel/projects/${project.id}`)
                    }
                    className={`${styles["project-name-container"]} ${styles["project-name-container-ending-soon"]}`}
                  >
                    {project.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className={styles["no-projects"]}>
            <h2 className={styles[""]}>
              {t("projects-notifications.no-projects")}
            </h2>
            <CustomButton
              variant="contained"
              color="primary"
              text={t("button.new-project")}
              icon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/user-panel/projects/new")}
            />
          </div>
        )}

        {projects.length > 0 &&
          projectsStartingToday.length === 0 &&
          projectsEndingToday.length === 0 &&
          projectsStartingSoon.length === 0 &&
          projectsEndingSoon.length === 0 && (
            <div className={styles["no-projects-to-show"]}>
              <h2>
                {t("projects-notifications.no-projects-starting-ending-soon")}
              </h2>
              <div className={styles["buttons-container"]}>
                <CustomButton
                  variant="contained"
                  color="primary"
                  text={t("button.new-project")}
                  icon={<AddCircleOutlineIcon />}
                  onClick={() => navigate("/user-panel/projects/new")}
                />

                <CustomButton
                  variant="contained"
                  color="primary"
                  text={t("button.my-projects")}
                  icon={<ListAltIcon />}
                  onClick={() => navigate("/user-panel/projects/all")}
                />
              </div>
            </div>
          )}
      </div>
    </>
  );
}
