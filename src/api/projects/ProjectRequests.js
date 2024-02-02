import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export async function getAllProjectsRequest(userId) {
  const querySnapshot = await getDocs(
    query(collection(db, "users", userId, "projects"))
  );
  const projects = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return projects;
}

export async function getProjectByIdRequest(userId, projectId) {
  try {
    const docRef = doc(db, "users", userId, "projects", projectId);
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

export async function postProjectRequest(userId, project) {
  const docRef = await addDoc(
    collection(db, "users", userId, "projects"),
    project
  );
  return {
    id: docRef.id,
    ...project,
  };
}
