// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBayk7TtyZ8uyNmcq5EBC7IVUSxhYKR0Y",
  authDomain: "book-haven-e9564.firebaseapp.com",
  projectId: "book-haven-e9564",
  storageBucket: "book-haven-e9564.firebasestorage.app",
  messagingSenderId: "1044568132761",
  appId: "1:1044568132761:web:8fe563c94279e2b720bc08",
  measurementId: "G-T2RGGGMV57"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);