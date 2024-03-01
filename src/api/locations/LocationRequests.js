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

export async function getAllLocationsRequest(userId) {
  const querySnapshot = await getDocs(
    query(collection(db, "users", userId, "locations"))
  );
  const locations = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return locations;
}

export async function getLocationByIdRequest(userId, locationId) {
  try {
    const docRef = doc(db, "users", userId, "locations", locationId);
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

export async function postLocationRequest(userId, location) {
  const docRef = await addDoc(
    collection(db, "users", userId, "locations"),
    location
  );
  return {
    id: docRef.id,
    ...location,
  };
}

export async function putLocationRequest(userId, locationId, location) {
  try {
    const docRef = doc(db, "users", userId, "locations", locationId);
    await updateDoc(docRef, location);
    return { id: docRef.id, ...location };
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

export async function deleteLocationRequest(userId, locationId) {
  try {
    const docRef = doc(db, "users", userId, "locations", locationId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error removing document:", error);
    throw error;
  }
}
