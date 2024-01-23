import React, { createContext, useEffect, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (userDoc.exists()) {
          if (userDoc.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  async function login(email, password) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", user.user.uid));

    if (userDoc.exists()) {
      if (userDoc.data().role === "admin") {
        setIsAdmin(true);
      }
    }

    return user;
  }

  async function signup(email, password, displayName) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName });
    // Add a new document in collection "users" with email, name and role
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      name: userCredential.user.displayName,
      role: "user",
    });
    return userCredential;
  }

  async function loginWithGoogle() {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    setIsAdmin(false);
    return await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        login,
        loginWithGoogle,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
