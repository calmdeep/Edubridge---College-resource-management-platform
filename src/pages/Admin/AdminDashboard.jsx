import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import {
  getAllResources,
}
from "../../services/resourceService";

export default function AdminDashboard() {

  const [stats,setStats] =
    useState({
      total:0,
      approved:0,
      pending:0,
      rejected:0,
    });

  useEffect(()=>{
    loadStats();
  },[]);

  const loadStats = async()=>{

    const resources =
      await getAllResources();

    setStats({

      total:
        resources.length,

      approved:
        resources.filter(
          r=>r.status==="approved"
        ).length,

      pending:
        resources.filter(
          r=>r.status==="pending"
        ).length,

      rejected:
        resources.filter(
          r=>r.status==="rejected"
        ).length,

    });

  };

  return(

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Resources</h3>
          <p className="text-3xl font-bold">
            {stats.total}
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow">
          <h3>Approved</h3>
          <p className="text-3xl font-bold">
            {stats.approved}
          </p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl shadow">
          <h3>Pending</h3>
          <p className="text-3xl font-bold">
            {stats.pending}
          </p>
        </div>

        <div className="bg-red-50 p-6 rounded-xl shadow">
          <h3>Rejected</h3>
          <p className="text-3xl font-bold">
            {stats.rejected}
          </p>
        </div>

      </div>

    </DashboardLayout>

  );
}