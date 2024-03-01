import React from "react";
import { AuthProvider } from "../auth/auth-context/AuthProvider";
import { LoadingProvider } from "../context/loading/LoadingProvider";
import { AlertProvider } from "./alerts/AlertProvider";
import { EditAlertProvider } from "./alerts/EditAlertProvider";
import { DialogProvider } from "./dialog/DialogProvider";
import { LanguageProvider } from "./language/LanguageProvider";
import { ProjectsProvider } from "./projects/ProjectsProvider";
import { RemindersProvider } from "./reminders/RemindersProvider";
import { TasksProvider } from "./tasks/TasksProvider";
import { SidebarProvider } from "./sidebar/SidebarProvider";
import { LocationsProvider } from "./locations/LocationsProvider";
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
                      <RemindersProvider>
                        <LocationsProvider>
                          <SidebarProvider>{children}</SidebarProvider>
                        </LocationsProvider>
                      </RemindersProvider>
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
