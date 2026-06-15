import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute=({children})=>{

 const {userData}=useAuth();

 if(!userData){

  return <Navigate to="/"/>

 }

 if(userData.role!=="admin"){

  return <Navigate to="/dashboard"/>

 }

 return children;
};

export default AdminRoute;