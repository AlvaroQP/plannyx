import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export async function getAllTasksRequest(userId, projectId) {
  const querySnapshot = await getDocs(
    query(collection(db, "users", userId, "projects", projectId, "tasks"))
  );
  const tasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return tasks;
}

export async function getTaskByIdRequest(userId, projectId, taskId) {
  try {
    const docRef = doc(
      db,
      "users",
      userId,
      "projects",
      projectId,
      "tasks",
      taskId
    );
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

export async function postTaskRequest(userId, projectId, task) {
  const docRef = await addDoc(
    collection(db, "users", userId, "projects", projectId, "tasks"),
    task
  );
  return {
    id: docRef.id,
    ...task,
  };
}

export async function putTaskRequest(userId, projectId, taskId, task) {
  try {
    const docRef = doc(
      db,
      "users",
      userId,
      "projects",
      projectId,
      "tasks",
      taskId
    );
    await updateDoc(docRef, task);
    return { id: docRef.id, ...task };
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

export async function deleteTaskRequest(userId, projectId, taskId) {
  try {
    const docRef = doc(
      db,
      "users",
      userId,
      "projects",
      projectId,
      "tasks",
      taskId
    );
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}
