import {
 createContext,
 useContext,
 useEffect,
 useState
} from "react";

import { auth, db } from "../firebase/firebase";

import {
 onAuthStateChanged
} from "firebase/auth";

import {
 doc,
 getDoc
} from "firebase/firestore";

const AuthContext=createContext();

export const useAuth=()=>useContext(AuthContext);

export const AuthProvider=({children})=>{

 const [user,setUser]=useState(null);
 const [userData,setUserData]=useState(null);
 const [loading,setLoading]=useState(true);

 useEffect(()=>{

  const unsubscribe=onAuthStateChanged(
   auth,
   async(currentUser)=>{

    setUser(currentUser);

    if(currentUser){

      const docRef=doc(
        db,
        "users",
        currentUser.uid
      );

      const docSnap=await getDoc(docRef);

      if(docSnap.exists()){

        setUserData(docSnap.data());

      }

    }

    setLoading(false);

   }
  );

  return unsubscribe;

 },[]);

 return(
  <AuthContext.Provider
   value={{
    user,
    userData
   }}
  >
   {!loading && children}
  </AuthContext.Provider>
 );
};