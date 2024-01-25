import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalContextProviders from "./context/GlobalContextProviders";
import RootLayout from "./pages/root-layout/RootLayout";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Projects from "./pages/user-panel/projects/Projects";
import UserPanelContainer from "./pages/user-panel/user-panel-container/UserPanelContainer";
import Calendar from "./pages/user-panel/calendar/Calendar";
import Dashboard from "./pages/user-panel/dashboard/Dashboard";
import RestrictedAccess from "./pages/restricted-access/RestrictedAccess";
import { useAuth } from "./auth/auth-context/AuthProvider";
import "./i18n";

export default function App() {
  function ComponentOrRestrictedAccess({ component: Component }) {
    const { isUserEmailVerified, isLoadingEmailVerification } = useAuth();
    if (isLoadingEmailVerification) {
      return null;
    }

    if (Component === UserPanelContainer) {
      return isUserEmailVerified ? <UserPanelContainer /> : <Home />;
    } else {
      return isUserEmailVerified ? <Component /> : <RestrictedAccess />;
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <ComponentOrRestrictedAccess component={UserPanelContainer} />
          ),
        },
        {
          path: "projects",
          element: <ComponentOrRestrictedAccess component={Projects} />,
        },
        {
          path: "calendar",
          element: <ComponentOrRestrictedAccess component={Calendar} />,
        },
        {
          path: "dashboard",
          element: <ComponentOrRestrictedAccess component={Dashboard} />,
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
