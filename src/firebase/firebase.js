import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import.meta.env.VITE_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: "AIzaSyC6WHuONWKdL6J4KTcv3ae6XnHUBRVYjDc",
  authDomain: "my-crh-project.firebaseapp.com",
  projectId: "my-crh-project",
  storageBucket: "my-crh-project.firebasestorage.app",
  messagingSenderId: "1051592569716",
  appId: "1:1051592569716:web:67fb3a7039e57d0d087221"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);