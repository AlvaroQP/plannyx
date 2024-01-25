import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase/firebase";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);
  const [isLoadingEmailVerification, setIsLoadingEmailVerification] =
    useState(true);

  useEffect(() => {
    async function updateUserDoc() {
      if (isUserEmailVerified && user) {
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
          emailVerified: true,
        });
      }
    }

    updateUserDoc();
  }, [isUserEmailVerified, user]);

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

  const getEmailVerifiedStatus = useCallback(async () => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        return userDoc.data().emailVerified;
      }
    }
    return false;
  }, [user]);

  useEffect(() => {
    getEmailVerifiedStatus().then((verified) => {
      setIsUserEmailVerified(verified);
      setIsLoadingEmailVerification(false);
    });
  }, [getEmailVerifiedStatus]);

  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Reloads the current user to check if the email is verified
    await userCredential.user.reload();

    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

    if (userDoc.exists()) {
      if (userDoc.data().role === "admin") {
        setIsAdmin(true);
      }
    }

    return userCredential;
  }

  async function signup(email, password, displayName) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, { displayName });

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      name: userCredential.user.displayName,
      role: "user",
    });

    await sendEmailVerification(userCredential.user);

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
        isUserEmailVerified,
        setIsUserEmailVerified,
        getEmailVerifiedStatus,
        isLoadingEmailVerification,
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
