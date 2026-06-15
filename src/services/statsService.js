import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const getPlatformStats = async () => {
  const usersSnapshot = await getDocs(
    collection(db, "users")
  );

  const resourcesSnapshot = await getDocs(
    collection(db, "resources")
  );

  const resources =
    resourcesSnapshot.docs.map((doc) =>
      doc.data()
    );

  const approvedResources =
    resources.filter(
      (r) => r.status === "approved"
    );

  const subjects = new Set(
    approvedResources.map(
      (r) => r.subject
    )
  );
  console.log("Users:", usersSnapshot.size);
console.log("Resources:", resourcesSnapshot.size);

  return {
    totalUsers: usersSnapshot.size,
    totalResources:
      approvedResources.length,
    totalSubjects: subjects.size,
  };
  
};