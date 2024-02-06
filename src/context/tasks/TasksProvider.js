import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import {
  getAllTasksRequest,
  postTaskRequest,
} from "../../api/tasks/TaskRequests";
import { useAuth } from "../../auth/auth-context/AuthProvider";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const { userId } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState(null);

  const getAllTasks = useCallback(
    async (projectId) => {
      let tasks = await getAllTasksRequest(userId, projectId);
      setTasks(tasks);
      return tasks;
    },
    [userId]
  );

  useEffect(() => {
    if (userId && projectId) {
      getAllTasks(projectId);
    }
  }, [userId, getAllTasks, projectId]);

  async function postTask(projectId, task) {
    const newTask = await postTaskRequest(userId, projectId, task);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        postTask,
        projectId,
        setProjectId,
        getAllTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
