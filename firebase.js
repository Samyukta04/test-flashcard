// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
