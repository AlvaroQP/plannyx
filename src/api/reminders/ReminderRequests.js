import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export async function getAllRemindersRequest(userId) {
  const querySnapshot = await getDocs(
    query(collection(db, "users", userId, "reminders"))
  );
  const reminders = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return reminders;
}

export async function postReminderRequest(userId, reminder) {
  const docRef = await addDoc(
    collection(db, "users", userId, "reminders"),
    reminder
  );
  return {
    id: docRef.id,
    ...reminder,
  };
}

export async function putReminderRequest(userId, reminderId, reminder) {
  try {
    const docRef = doc(db, "users", userId, "reminders", reminderId);
    await updateDoc(docRef, reminder);
    return { id: docRef.id, ...reminder };
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

export async function deleteReminderRequest(userId, reminderId) {
  try {
    const docRef = doc(db, "users", userId, "reminders", reminderId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}
