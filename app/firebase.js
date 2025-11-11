import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged as _onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAO_DXIlKV4NocJc841xXk1gUtsNnOHR8",
  authDomain: "flashcardsaas-c405f.firebaseapp.com",
  projectId: "flashcardsaas-c405f",
  storageBucket: "flashcardsaas-c405f.appspot.com",
  messagingSenderId: "455342519480",
  appId: "1:455342519480:web:631e61feacf30163b0b04d",
  measurementId: "G-KYGFP7CY9Z",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

// Auth functions
export function onAuthStateChanged(callback) {
  return _onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
}

export { db, auth };
