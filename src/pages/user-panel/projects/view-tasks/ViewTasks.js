import React, { useState, useEffect } from "react";
import { useTasks } from "../../../../context/tasks/TasksProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useTranslation } from "react-i18next";
import CustomTasksTable from "../../../../components/ui/table/CustomTasksTable";
import styles from "./ViewTasks.module.css";

export default function ViewTasks({ projectId }) {
  const { setIsLoading } = useLoading();
  const { getAllTasks } = useTasks();
  const [projectTasks, setProjectTasks] = useState([]);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchProject() {
      setIsLoading(true);
      setFinishedLoading(false);
      if (projectId) {
        let tasks = await getAllTasks(projectId);
        let formattedTasks = tasks.map((task) => ({
          name: task.name,
          startDate: task.startDate.toDate(),
          endDate: task.endDate ? task.endDate.toDate() : "not-specified",
          status: task.status,
          priority: task.priority,
        }));
        setProjectTasks(formattedTasks);
      }
      setIsLoading(false);
      setFinishedLoading(true);
    }
    fetchProject();
  }, [projectId, getAllTasks, setIsLoading, t]);

  const tasks = (
    <CustomTasksTable title={t("task.tasks")} rows={projectTasks} />
  );

  const noTasks = (
    <div className={styles["no-tasks-yet-container"]}>
      <p>{t("task.no-tasks-yet")}</p>
    </div>
  );

  return (
    <div className={styles["tasks-and-no-tasks-container"]}>
      {finishedLoading ? (projectTasks.length > 0 ? tasks : noTasks) : null}
    </div>
  );
}
