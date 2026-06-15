import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";


import { db } from "../firebase/firebase";

/* ==========================
   CREATE RESOURCE
========================== */
/* ==========================
   GET SINGLE RESOURCE
========================== */
/* ==========================
   BOOKMARKS
========================== */

export const addBookmark = async (
  userId,
  resourceId
) => {

  await addDoc(
    collection(db, "bookmarks"),
    {
      userId,
      resourceId,
      createdAt: serverTimestamp(),
    }
  );
};

export const getBookmarks =
  async (userId) => {

    const q = query(
      collection(db, "bookmarks"),
      where("userId", "==", userId)
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
};

export const removeBookmark =
  async (bookmarkId) => {

    await deleteDoc(
      doc(db, "bookmarks", bookmarkId)
    );
};

export const getResourceById = async (id) => {

  const docRef = doc(
    db,
    "resources",
    id
  );

  const snapshot =
    await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const createResource = async (data) => {
  await addDoc(
    collection(db, "resources"),
    {
      ...data,
      status: "pending",
      downloads: 0,
      createdAt: serverTimestamp(),
    }
  );
};
export const getRecentUserResources =
async(uid)=>{

 const resources =
   await getUserResources(uid);

 return resources.slice(0,5);

};

/* ==========================
   USER RESOURCES
========================== */

export const getUserResources = async (uid) => {
  const q = query(
    collection(db, "resources"),
    where("uploaderId", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ==========================
   APPROVED RESOURCES
========================== */

export const getApprovedResources = async () => {
  const q = query(
    collection(db, "resources"),
    where("status", "==", "approved")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ==========================
   PENDING RESOURCES
========================== */

export const getPendingResources = async () => {
  const q = query(
    collection(db, "resources"),
    where("status", "==", "pending")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ==========================
   APPROVE RESOURCE
========================== */

export const approveResource = async (resourceId) => {
  await updateDoc(
    doc(db, "resources", resourceId),
    {
      status: "approved",
    }
  );
};

/* ==========================
   REJECT RESOURCE
========================== */

export const rejectResource = async (resourceId) => {
  await updateDoc(
    doc(db, "resources", resourceId),
    {
      status: "rejected",
    }
  );
};

/* ==========================
   DELETE RESOURCE
========================== */

export const deleteResource = async (resourceId) => {
  await deleteDoc(
    doc(db, "resources", resourceId)
  );
};

/* ==========================
   DASHBOARD STATS
========================== */

export const getAllResources = async () => {
  const snapshot = await getDocs(
    collection(db, "resources")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getUserStats = async (uid) => {
  const resources =
    await getUserResources(uid);

  return {
    total: resources.length,

    approved: resources.filter(
      (r) => r.status === "approved"
    ).length,

    pending: resources.filter(
      (r) => r.status === "pending"
    ).length,

    rejected: resources.filter(
      (r) => r.status === "rejected"
    ).length,
  };
};