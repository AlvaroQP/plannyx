import { db } from "../../firebase/firebase";
import { collection, addDoc, query, getDocs } from "firebase/firestore";

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
