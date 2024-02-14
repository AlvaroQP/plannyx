import React from "react";
import { AuthProvider } from "../auth/auth-context/AuthProvider";
import { LoadingProvider } from "../context/loading/LoadingProvider";
import { AlertProvider } from "./alerts/AlertProvider";
import { EditAlertProvider } from "./alerts/EditAlertProvider";
import { DialogProvider } from "./dialog/DialogProvider";
import { LanguageProvider } from "./language/LanguageProvider";
import { ProjectsProvider } from "./projects/ProjectsProvider";
import { TasksProvider } from "./tasks/TasksProvider";
import { SidebarProvider } from "./sidebar/SidebarProvider";
import ThemeWrapper from "./theme/ThemeProvider";

export default function GlobalContextProviders({ children }) {
  return (
    <AlertProvider>
      <EditAlertProvider>
        <DialogProvider>
          <LoadingProvider>
            <AuthProvider>
              <LanguageProvider>
                <ThemeWrapper>
                  <ProjectsProvider>
                    <TasksProvider>
                      <SidebarProvider>{children}</SidebarProvider>
                    </TasksProvider>
                  </ProjectsProvider>
                </ThemeWrapper>
              </LanguageProvider>
            </AuthProvider>
          </LoadingProvider>
        </DialogProvider>
      </EditAlertProvider>
    </AlertProvider>
  );
}
