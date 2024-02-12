import React, { createContext, useState, useContext } from "react";

const EditAlertContext = createContext();

export function EditAlertProvider({ children }) {
  const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
  const [isErrorEditAlertOpen, setIsErrorEditAlertOpen] = useState(false);

  function handleOpenEditAlert() {
    setIsEditAlertOpen(true);
  }

  function handleCloseEditAlert() {
    setIsEditAlertOpen(false);
  }

  function handleOpenErrorEditAlert() {
    setIsErrorEditAlertOpen(true);
  }

  function handleCloseErrorEditAlert() {
    setIsErrorEditAlertOpen(false);
  }

  return (
    <EditAlertContext.Provider
      value={{
        isEditAlertOpen,
        isErrorEditAlertOpen,
        handleOpenEditAlert,
        handleCloseEditAlert,
        handleOpenErrorEditAlert,
        handleCloseErrorEditAlert,
      }}
    >
      {children}
    </EditAlertContext.Provider>
  );
}

export function useEditAlert() {
  const context = useContext(EditAlertContext);
  if (context === undefined) {
    throw new Error("useEditAlert must be used within an AlertProvider");
  }
  return context;
}
