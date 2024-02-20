import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  getAllRemindersRequest,
  postReminderRequest,
  putReminderRequest,
  deleteReminderRequest,
} from "../../api/reminders/ReminderRequests";
import { useAuth } from "../../auth/auth-context/AuthProvider";

const RemindersContext = createContext();

export function RemindersProvider({ children }) {
  const { userId } = useAuth();
  const [reminders, setReminders] = useState([]);

  const getAllReminders = useCallback(async () => {
    let reminders = await getAllRemindersRequest(userId);
    setReminders(reminders);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getAllReminders();
    }
  }, [userId, getAllReminders]);

  async function postReminder(reminder) {
    const newReminder = await postReminderRequest(userId, reminder);
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  }

  async function putReminder(reminderId, reminder) {
    const updatedReminder = await putReminderRequest(
      userId,
      reminderId,
      reminder
    );
    setReminders((prevReminders) =>
      prevReminders.map((r) => (r.id === reminderId ? updatedReminder : r))
    );
  }

  async function deleteReminder(reminderId) {
    await deleteReminderRequest(userId, reminderId);
    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== reminderId)
    );
  }

  return (
    <RemindersContext.Provider
      value={{
        reminders,
        setReminders,
        getAllReminders,
        postReminder,
        putReminder,
        deleteReminder,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(RemindersContext);
  if (!context) {
    throw new Error("useReminders must be used within a RemindersProvider");
  }
  return context;
}
