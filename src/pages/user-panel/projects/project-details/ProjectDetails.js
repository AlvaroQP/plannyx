import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../../../../context/projects/ProjectsProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/ui/button/CustomButton";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import ProjectDetailsContainer from "./project-details-container/ProjectDetailsContainer";
import NewTask from "../new-task/NewTask";
import ViewTasks from "../view-tasks/ViewTasks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./ProjectDetails.module.css";
import { useTasks } from "../../../../context/tasks/TasksProvider";

export default function ProjectDetails() {
  let { id } = useParams();
  const { setProjectId } = useTasks();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();
  const { setIsLoading } = useLoading();
  const [project, setProject] = useState(null);
  const [isProjectFetched, setIsProjectFetched] = useState(false);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showViewTasks, setShowViewTasks] = useState(false);

  function handleShowNewTaskForm() {
    setShowNewTaskForm(true);
    setShowViewTasks(false);
  }

  function handleShowViewTasks() {
    setShowNewTaskForm(false);
    setShowViewTasks(true);
  }

  useEffect(() => {
    async function fetchProject() {
      setIsLoading(true);
      try {
        const project = await getProjectById(id);
        setProject(project);
        setIsProjectFetched(true);
        setProjectId(id);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id, getProjectById, setIsLoading, setProjectId]);

  return (
    <>
      {project && (
        <>
          <UserPanelHeader title={t("project.project-details")} />

          <div className={styles["back-button-container"]}>
            <CustomButton
              variant="outlined"
              text={t("user-panel-sidebar.my-projects")}
              onClick={() => navigate("/user-panel/projects/all")}
              icon={<ArrowBackIcon />}
            />
          </div>

          <section className={styles["project-details-section"]}>
            <ProjectDetailsContainer project={project} />
          </section>

          <section className={styles["tasks-section"]}>
            <div className={styles["task-buttons-container"]}>
              <CustomButton
                variant="outlined"
                text={t("task.new-task")}
                onClick={() => handleShowNewTaskForm()}
              />
              <CustomButton
                variant="outlined"
                text={t("task.view-tasks")}
                onClick={() => handleShowViewTasks()}
              />
            </div>

            {showNewTaskForm && <NewTask projectId={id} />}
            {showViewTasks && <ViewTasks projectId={id} />}
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
