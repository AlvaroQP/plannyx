import React, { useState, useEffect } from "react";
import { useTasks } from "../../../../context/tasks/TasksProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useTranslation } from "react-i18next";
import CustomScrollableTabs from "../../../../components/ui/tabs/CustomScrollableTabs";
import CustomTasksTable from "../../../../components/ui/table/CustomTasksTable";
import NewTask from "../new-task/NewTask";
import styles from "./ViewTasks.module.css";

export default function ViewTasks({ projectId }) {
  const { setIsLoading } = useLoading();
  const { getAllTasks, taskCount, modifiedTaskCount } = useTasks();
  const [projectTasks, setProjectTasks] = useState([]);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchProject() {
      setIsLoading(true);
      setFinishedLoading(false);
      if (projectId) {
        let allTasks = await getAllTasks(projectId);
        let formattedTasks = allTasks.map((task) => ({
          id: task.id,
          name: task.name,
          startDate: task.startDate.toDate(),
          endDate: task.endDate ? task.endDate.toDate() : "not-specified",
          notes: task.notes ? task.notes : "",
          priority: task.priority,
          status: task.status,
        }));
        setProjectTasks(formattedTasks);
      }
      setIsLoading(false);
      setFinishedLoading(true);
    }
    fetchProject();
  }, [projectId, getAllTasks, setIsLoading, t, taskCount, modifiedTaskCount]);

  function showTasks() {
    return (
      <div className={styles["tasks-tabs-container"]}>
        <CustomScrollableTabs
          initialTabId={2}
          tabs={[
            {
              id: 1,
              name: (
                <div className={styles["new-task-div"]}>
                  {t("task.new-task")}
                </div>
              ),
              content: <NewTask projectId={projectId} />,
            },
            {
              id: 2,
              name: t("tasks-tabs-titles.all-tasks"),
              content: (
                <CustomTasksTable title={t("task.tasks")} rows={projectTasks} />
              ),
            },
            {
              id: 3,
              name: t("tasks-tabs-titles.not-started"),
              content: (
                <CustomTasksTable
                  title={t("task.tasks")}
                  rows={projectTasks.filter(
                    (task) => task.status === "not started"
                  )}
                />
              ),
            },
            {
              id: 4,
              name: t("tasks-tabs-titles.in-progress"),
              content: (
                <CustomTasksTable
                  title={t("task.tasks")}
                  rows={projectTasks.filter(
                    (task) => task.status === "in progress"
                  )}
                />
              ),
            },
            {
              id: 5,
              name: t("tasks-tabs-titles.finished"),
              content: (
                <CustomTasksTable
                  title={t("task.tasks")}
                  rows={projectTasks.filter(
                    (task) => task.status === "finished"
                  )}
                />
              ),
            },
            {
              id: 6,
              name: t("tasks-tabs-titles.stuck"),
              content: (
                <CustomTasksTable
                  title={t("task.tasks")}
                  rows={projectTasks.filter((task) => task.status === "stuck")}
                />
              ),
            },
          ]}
        />
      </div>
    );
  }

  const noTasks = (
    <div className={styles["no-tasks-yet-container"]}>
      <p>{t("task.no-tasks-yet")}</p>
      <div className={styles["no-tasks-tabs-container"]}>
        <CustomScrollableTabs
          initialTabId={1}
          tabs={[
            {
              id: 1,
              name: t("task.new-task"),
              content: <NewTask projectId={projectId} />,
            },
          ]}
        />
      </div>
    </div>
  );

  return (
    <div className={styles["tasks-and-no-tasks-container"]}>
      {finishedLoading
        ? projectTasks.length > 0
          ? showTasks()
          : noTasks
        : null}
    </div>
  );
}
