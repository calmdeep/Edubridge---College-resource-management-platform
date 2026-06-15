import { auth, db } from "../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

export const registerUser = async (
  name,
  email,
  password,
  course,
  branch
) => {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(
    doc(db, "users", result.user.uid),
    {
      uid: result.user.uid,
      name,
      email,
      course,
      branch,
      role: "student",
      createdAt: new Date(),
    }
  );

  return result;
};

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(
    auth,
    email,
    password
  );

export const logoutUser = () =>
  signOut(auth);