import React, { useState, useEffect } from "react";
import styles from "./ViewTasks.module.css";
import { useTasks } from "../../../../context/tasks/TasksProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";
import { useTranslation } from "react-i18next";
import CustomScrollableTabs from "../../../../components/ui/tabs/CustomScrollableTabs";
import CustomTasksTable from "../../../../components/ui/table/CustomTasksTable";
import NewTask from "../new-task/NewTask";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

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
              name: (
                <div className={styles["task-status-name-container"]}>
                  <RemoveCircleOutlineIcon
                    sx={{ fontSize: "1rem", color: "#A0A0A0" }}
                  />
                  {t("tasks-tabs-titles.not-started")}
                </div>
              ),
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
              name: (
                <div className={styles["task-status-name-container"]}>
                  <CircleIcon sx={{ fontSize: "1rem", color: "#008000" }} />
                  {t("tasks-tabs-titles.in-progress")}
                </div>
              ),
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
              name: (
                <div className={styles["task-status-name-container"]}>
                  <CheckCircleIcon
                    sx={{ fontSize: "1rem", color: "#3071D4" }}
                  />
                  {t("tasks-tabs-titles.finished")}
                </div>
              ),
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
              name: (
                <div className={styles["task-status-name-container"]}>
                  <ErrorIcon sx={{ fontSize: "1rem", color: "#D43030" }} />
                  {t("tasks-tabs-titles.stuck")}
                </div>
              ),
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
