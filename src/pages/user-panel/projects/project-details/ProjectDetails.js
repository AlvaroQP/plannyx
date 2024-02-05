import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../../../../context/projects/ProjectsProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/ui/button/CustomButton";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import ProjectDetailsContainer from "./project-details-container/ProjectDetailsContainer";
import styles from "./ProjectDetails.module.css";

export default function ProjectDetails() {
  let { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();
  const { setIsLoading } = useLoading();
  const [project, setProject] = useState(null);
  const [isProjectFetched, setIsProjectFetched] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      setIsLoading(true);
      try {
        const project = await getProjectById(id);
        setProject(project);
        setIsProjectFetched(true);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id, getProjectById, setIsLoading]);

  return (
    <>
      {project && (
        <>
          <UserPanelHeader title={t("project.project-details")} />

          <section className={styles["project-details-section"]}>
            <ProjectDetailsContainer project={project} />
          </section>
        </>
      )}

      {!project && isProjectFetched && (
        <div className={styles["not-found-container"]}>
          <h2>{t("project.not-found")}</h2>
          <p>{t("project.not-found-description")}</p>
          <CustomButton
            variant="contained"
            text={t("button.back")}
            onClick={() => navigate("/user-panel/projects/all")}
          />
        </div>
      )}
    </>
  );
}
