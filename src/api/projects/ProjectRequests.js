import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

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
