import React, { createContext, useState, useContext } from "react";
import { postProjectRequest } from "../../api/projects/ProjectRequests";
import { useAuth } from "../../auth/auth-context/AuthProvider";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const { userId } = useAuth();
  const [projects, setProjects] = useState([]);

  async function postProject(project) {
    const newProject = await postProjectRequest(userId, project);
    setProjects((prevProjects) => [...prevProjects, newProject]);
  }

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, postProject }}>
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
