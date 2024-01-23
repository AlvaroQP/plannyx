import React from "react";
import { AuthProvider } from "../auth/auth-context/AuthProvider";
import { LoadingProvider } from "../context/loading/LoadingProvider";

export default function GlobalContextProviders({ children }) {
  return (
    <AuthProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </AuthProvider>
  );
}
