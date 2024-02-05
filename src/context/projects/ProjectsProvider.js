import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  getAllProjectsRequest,
  getProjectByIdRequest,
  postProjectRequest,
  putProjectRequest,
} from "../../api/projects/ProjectRequests";
import { useAuth } from "../../auth/auth-context/AuthProvider";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const { userId } = useAuth();
  const [projects, setProjects] = useState([]);

  const getAllProjects = useCallback(async () => {
    let projects = await getAllProjectsRequest(userId);
    projects = projects.sort((a, b) => b.createdAt - a.createdAt);
    setProjects(projects);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getAllProjects();
    }
  }, [userId, getAllProjects]);

  async function getProjectById(projectId) {
    const project = await getProjectByIdRequest(userId, projectId);
    return project;
  }

  async function postProject(project) {
    const newProject = await postProjectRequest(userId, project);
    setProjects((prevProjects) => [...prevProjects, newProject]);
  }

  async function putProject(projectId, project) {
    const updatedProject = await putProjectRequest(userId, projectId, project);
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === projectId ? updatedProject : p))
    );
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        getAllProjects,
        getProjectById,
        postProject,
        putProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
