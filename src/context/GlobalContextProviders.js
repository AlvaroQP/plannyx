import React from "react";
import { AuthProvider } from "../auth/auth-context/AuthProvider";
import { LoadingProvider } from "../context/loading/LoadingProvider";
import { AlertProvider } from "./alerts/AlertProvider";
import { DialogProvider } from "./dialog/DialogProvider";
import { LanguageProvider } from "./language/LanguageProvider";
import { ProjectsProvider } from "./projects/ProjectsProvider";
import ThemeWrapper from "./theme/ThemeProvider";

export default function GlobalContextProviders({ children }) {
  return (
    <AlertProvider>
      <DialogProvider>
        <LoadingProvider>
          <AuthProvider>
            <LanguageProvider>
              <ThemeWrapper>
                <ProjectsProvider>{children}</ProjectsProvider>
              </ThemeWrapper>
            </LanguageProvider>
          </AuthProvider>
        </LoadingProvider>
      </DialogProvider>
    </AlertProvider>
  );
}
