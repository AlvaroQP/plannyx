import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalContextProviders from "./context/GlobalContextProviders";
import RootLayout from "./pages/root-layout/RootLayout";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import { useAuth } from "./auth/auth-context/AuthProvider";
import UserPanel from "./pages/user-panel/UserPanel";
import "./i18n";

function UserPanelOrHome() {
  const { isUserEmailVerified, isLoadingEmailVerification } = useAuth();

  if (isLoadingEmailVerification) {
    return null;
  }

  return isUserEmailVerified ? <UserPanel /> : <Home />;
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <UserPanelOrHome />,
        },
        {
          path: "projects",
          element: <Projects />,
        },
      ],
    },
  ]);

  return (
    <GlobalContextProviders>
      <RouterProvider router={router} />
    </GlobalContextProviders>
  );
}
