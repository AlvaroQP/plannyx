import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalContextProviders from "./context/GlobalContextProviders";
import RootLayout from "./pages/root-layout/RootLayout";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
    },
  ]);

  return <RouterProvider router={router} />;
}
