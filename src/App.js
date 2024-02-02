import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalContextProviders from "./context/GlobalContextProviders";
import RootLayout from "./pages/root-layout/RootLayout";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import NewProject from "./pages/user-panel/projects/new-project/NewProject";
import ProjectsContainer from "./pages/user-panel/projects/projects-container/ProjectsContainer";
import UserPanelContainer from "./pages/user-panel/user-panel-container/UserPanelContainer";
import Calendar from "./pages/user-panel/calendar/Calendar";
import Dashboard from "./pages/user-panel/dashboard/Dashboard";
import AccessDenied from "./pages/access-denied/AccessDenied";
import { useAuth } from "./auth/auth-context/AuthProvider";
import "./i18n";
import ProjectDetail from "./pages/user-panel/projects/project-detail/ProjectDetail";

export default function App() {
  function ComponentOrAccessDenied({ component: Component }) {
    const { isLoadingEmailVerification, isLoggedIn, isAuthChecking } =
      useAuth();

    if (isAuthChecking || isLoadingEmailVerification) {
      return null;
    }

    if (Component === Home) {
      return !isLoggedIn ? <Home /> : <UserPanelContainer />;
    }

    if (isLoggedIn) {
      return <Component />;
    }

    return <AccessDenied />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <ComponentOrAccessDenied component={Home} />,
        },
        {
          path: "user-panel",
          element: <ComponentOrAccessDenied component={UserPanelContainer} />,
          children: [
            {
              path: "projects/new",
              element: <ComponentOrAccessDenied component={NewProject} />,
            },
            {
              path: "projects/all",
              element: (
                <ComponentOrAccessDenied component={ProjectsContainer} />
              ),
            },
            {
              path: "projects/:id",
              element: <ComponentOrAccessDenied component={ProjectDetail} />,
            },
            {
              path: "calendar",
              element: <ComponentOrAccessDenied component={Calendar} />,
            },
            {
              path: "dashboard",
              element: <ComponentOrAccessDenied component={Dashboard} />,
            },
          ],
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
