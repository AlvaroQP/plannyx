import React from "react";
import { AuthProvider } from "../auth/auth-context/AuthProvider";
import { LoadingProvider } from "../context/loading/LoadingProvider";
import { AlertProvider } from "./alerts/AlertProvider";
import { LanguageProvider } from "./language/LanguageProvider";

export default function GlobalContextProviders({ children }) {
  return (
    <AlertProvider>
      <LoadingProvider>
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </LoadingProvider>
    </AlertProvider>
  );
}
