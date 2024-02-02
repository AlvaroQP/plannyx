import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../../../../context/projects/ProjectsProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/ui/button/CustomButton";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetail() {
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
      const project = await getProjectById(id);
      setProject(project);
      setIsLoading(false);
      setIsProjectFetched(true);
    }

    fetchProject();
  }, [id, getProjectById, setIsLoading]);

  return (
    <>
      {project && (
        <>
          <UserPanelHeader title={t("project.project-details")} />
          <div className={styles["project-details-container"]}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </div>
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
