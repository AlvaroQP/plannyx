import React, { createContext, useState, useContext } from "react";
import CustomFormDialog from "../../components/ui/dialog/CustomFormDialog";

const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  function openDialog(dialog) {
    setDialog(dialog);
  }

  function closeDialog() {
    setDialog(null);
  }

  return (
    <DialogContext.Provider value={{ dialog, openDialog, closeDialog }}>
      {children}
      {dialog && (
        <CustomFormDialog
          open={!!dialog}
          handleClose={closeDialog}
          title={dialog.title}
          severity={dialog.severity}
          description={dialog.description}
        />
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
