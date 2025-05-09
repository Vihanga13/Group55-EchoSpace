// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmQocW00ygPNKIa-tol0bOgHEFsHIHDps",
  authDomain: "echo-space.firebaseapp.com",
  projectId: "echo-space",
  storageBucket: "echo-space.firebasestorage.app",
  messagingSenderId: "126525536280",
  appId: "1:126525536280:web:addc53584e197a4dddab6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);