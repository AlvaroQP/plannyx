import React, { useState, useEffect } from "react";
import { useTasks } from "../../../../context/tasks/TasksProvider";
import { useLoading } from "../../../../context/loading/LoadingProvider";

export default function ViewTasks({ projectId }) {
  const { setIsLoading } = useLoading();
  const { getAllTasks } = useTasks();
  const [projectTasks, setProjectTasks] = useState([]);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      setIsLoading(true);
      setFinishedLoading(false);
      if (projectId) {
        let tasks = await getAllTasks(projectId);
        setProjectTasks(tasks);
      }
      setIsLoading(false);
      setFinishedLoading(true);
    }
    fetchProject();
  }, [projectId, getAllTasks, setIsLoading]);

  const tasks = (
    <div>
      {projectTasks.map((task) => (
        <div key={task.id}>
          <p>{task.name}</p>
        </div>
      ))}
    </div>
  );

  const noTasks = (
    <div>
      <p>No tasks yet</p>
    </div>
  );

  return (
    <div>
      {finishedLoading ? (projectTasks.length > 0 ? tasks : noTasks) : null}
    </div>
  );
}
