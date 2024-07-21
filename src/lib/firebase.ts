import { initializeApp } from "firebase/app";
import { AuthError, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCNJQhfE3Fe-DHZuSPxRDS4KWv4EJRsz0",
  authDomain: "reddit-clone-d8ae6.firebaseapp.com",
  projectId: "reddit-clone-d8ae6",
  storageBucket: "reddit-clone-d8ae6.appspot.com",
  messagingSenderId: "1040598517841",
  appId: "1:1040598517841:web:8759c7d1d7c028190ed070",
  measurementId: "G-L2GD9DXZQV",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const mapFirebaseAuthError = (error: AuthError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already in use";
    case "auth/invalid-email":
      return "This email is invalid";
    case "auth/user-disabled":
      return "This user has been disabled";
    case "auth/user-not-found":
      return "This user was not found";
    case "auth/wrong-password":
      return "The password is incorrect";
    case "auth/invalid-credential":
      return "The provided credentials are invalid";
    case "auth/popup-closed-by-user":
      return "The popup was closed before authentication";
    default:
      return "An unexpected authentication error occurred";
  }
};
