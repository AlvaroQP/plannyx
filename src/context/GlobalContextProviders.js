import React from "react";
import { AuthProvider } from "../auth/auth-context/AuthProvider";
import { LoadingProvider } from "../context/loading/LoadingProvider";
import { AlertProvider } from "./alerts/AlertProvider";

export default function GlobalContextProviders({ children }) {
  return (
    <AuthProvider>
      <LoadingProvider>
        <AlertProvider>{children}</AlertProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}
