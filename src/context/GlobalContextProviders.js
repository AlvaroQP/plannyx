import React from "react";
import { AuthProvider } from "../auth/auth-context/AuthProvider";
import { LoadingProvider } from "../context/loading/LoadingProvider";
import { AlertProvider } from "./alerts/AlertProvider";
import { LanguageProvider } from "./language/LanguageProvider";
import ThemeWrapper from "./theme/ThemeProvider";

export default function GlobalContextProviders({ children }) {
  return (
    <AlertProvider>
      <LoadingProvider>
        <AuthProvider>
          <LanguageProvider>
            <ThemeWrapper>{children}</ThemeWrapper>
          </LanguageProvider>
        </AuthProvider>
      </LoadingProvider>
    </AlertProvider>
  );
}
