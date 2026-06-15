import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ==========================
   GET ALL USERS
========================== */

export const getAllUsers = async () => {
  const snapshot = await getDocs(
    collection(db, "users")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ==========================
   MAKE ADMIN
========================== */

export const makeAdmin = async (userId) => {
  await updateDoc(
    doc(db, "users", userId),
    {
      role: "admin",
    }
  );
};

/* ==========================
   GET USER PROFILE
========================== */

export const getUserProfile = async (
  userId
) => {

  const snapshot = await getDoc(
    doc(db, "users", userId)
  );

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

/* ==========================
   UPDATE PROFILE
========================== */

export const updateUserProfile = async (
  userId,
  data
) => {

  await updateDoc(
    doc(db, "users", userId),
    data
  );

};