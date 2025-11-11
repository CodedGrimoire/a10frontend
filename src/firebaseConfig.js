// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Debugging helper
const requiredKeys = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

requiredKeys.forEach((key) => {
  const val = import.meta.env[key];
  if (!val) {
    console.error(
      `%c[Firebase Config Error] Missing or empty environment variable: ${key}`,
      "color: red; font-weight: bold;"
    );
  } else if (val.includes("your")) {
    console.warn(
      `%c[Firebase Warning] Variable ${key} still contains a placeholder value.`,
      "color: orange;"
    );
  }
});

// Log the API key visibility (truncated for safety)
console.log(
  "%c[Firebase] Config loaded:",
  "color: green; font-weight: bold;",
  {
    apiKey: firebaseConfig.apiKey?.slice(0, 5) + "...",
    projectId: firebaseConfig.projectId,
  }
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
