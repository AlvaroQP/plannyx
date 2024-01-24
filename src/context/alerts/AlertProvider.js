import React, { createContext, useState, useContext } from "react";
import CustomAlert from "../../components/ui/alert/CustomAlert";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  function createAlert(severity, message) {
    setAlert({ severity, message });
  }

  function closeAlert() {
    setAlert(null);
  }

  return (
    <AlertContext.Provider value={{ alert, createAlert, closeAlert }}>
      <CustomAlert />
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
