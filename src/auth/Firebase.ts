// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCIoSHIK9oce5iowlrrEG0qVVD9XhY8mH8",
	authDomain: "bookdepo-store.firebaseapp.com",
	projectId: "bookdepo-store",
	storageBucket: "bookdepo-store.appspot.com",
	messagingSenderId: "905097152156",
	appId: "1:905097152156:web:16eab3c318bfbebcdb4f59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
