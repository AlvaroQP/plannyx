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
  deleteTaskRequest,
} from "../../api/tasks/TaskRequests";
import { useAuth } from "../../auth/auth-context/AuthProvider";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const { userId } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [taskCount, setTaskCount] = useState(0);

  const getAllTasks = useCallback(
    async (projectId) => {
      let tasks = await getAllTasksRequest(userId, projectId);
      setTasks(tasks);
      setTaskCount(tasks.length);
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
    setTaskCount((prevCount) => prevCount + 1);
  }

  async function deleteTask(taskId) {
    await deleteTaskRequest(userId, projectId, taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setTaskCount((prevCount) => prevCount - 1);
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
        taskCount,
        deleteTask,
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
