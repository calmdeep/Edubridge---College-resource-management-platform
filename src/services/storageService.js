import { storage } from "../firebase/firebase";

import {
 ref,
 uploadBytes,
 getDownloadURL
} from "firebase/storage";

export const uploadPDF = async (file) => {

 try {

  const fileRef = ref(
   storage,
   `resources/${Date.now()}-${file.name}`
  );

  await uploadBytes(fileRef, file);

  const url = await getDownloadURL(fileRef);

  return url;

 } catch (error) {

  console.error(error);
  throw error;

 }
};