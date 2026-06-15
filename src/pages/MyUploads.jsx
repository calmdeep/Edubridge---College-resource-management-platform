import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import { getUserResources } from "../services/resourceService";

import { useAuth } from "../context/AuthContext";

export default function MyUploads() {

 const { user } = useAuth();

 const [resources, setResources] = useState([]);

 useEffect(() => {

  loadResources();

 }, []);

 const loadResources = async () => {

  const data =
   await getUserResources(user.uid);

  setResources(data);

 };

 return (

 <DashboardLayout>

  <h1 className="text-3xl font-bold mb-6">

   My Uploads

  </h1>

  <div className="bg-white rounded shadow overflow-hidden">

   <table className="w-full">

    <thead>

     <tr className="bg-gray-100">

      <th className="p-3">Title</th>

      <th className="p-3">Type</th>

      <th className="p-3">Subject</th>

      <th className="p-3">Status</th>

     </tr>

    </thead>

    <tbody>

     {resources.map(resource => (

      <tr key={resource.id}>

       <td className="p-3">
        {resource.title}
       </td>

       <td className="p-3">
        {resource.type}
       </td>

       <td className="p-3">
        {resource.subject}
       </td>

       <td className="p-3">

        {resource.status === "approved" && "🟢 Approved"}

        {resource.status === "pending" && "🟡 Pending"}

        {resource.status === "rejected" && "🔴 Rejected"}

       </td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 </DashboardLayout>

 );
}