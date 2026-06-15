import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import { useAuth } from "../context/AuthContext";

import {
  getUserStats,
  getUserResources,
} from "../services/resourceService";

import {
  FaUpload,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const { user, userData } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [recentUploads, setRecentUploads] =
    useState([]);

  useEffect(() => {
    if (user) {
      loadDashboard();
    }
  }, [user]);

  const loadDashboard = async () => {
    try {
      const statData =
        await getUserStats(user.uid);

      setStats(statData);

      const resources =
        await getUserResources(user.uid);

      setRecentUploads(
        resources.slice(0, 5)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Total Resources",
      value: stats.total,
      icon: <FaUpload />,
      color: "text-purple-600",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <FaCheckCircle />,
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "text-yellow-600",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle />,
      color: "text-red-600",
    },
  ];

  return (
    <DashboardLayout>

      {/* Welcome */}

      <div
        className="
        bg-gradient-to-r
        from-purple-600
        to-indigo-600
        rounded-3xl
        p-5
        sm:p-6
        lg:p-8
        text-white
        mb-6
        lg:mb-8
        "
      >

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">

          Welcome back,
          {" "}
          {userData?.name}
          👋

        </h1>

        <p className="mt-2 text-sm sm:text-base opacity-90">

          Manage your notes, uploads and bookmarks from one place.

        </p>

      </div>

      {/* Stats */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        lg:gap-6
        "
      >

        {cards.map((card) => (

          <div
            key={card.title}
            className="
            bg-white
            rounded-3xl
            border
            border-slate-100
            p-5
            lg:p-6
            shadow-sm
            hover:shadow-md
            transition
            "
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="text-slate-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-2xl lg:text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`
                text-xl
                lg:text-2xl
                ${card.color}
                `}
              >
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Recent Uploads */}

      <div className="mt-8 lg:mt-10">

        <h2 className="text-xl lg:text-2xl font-bold mb-5">
          Recent Uploads
        </h2>

        {recentUploads.length === 0 ? (

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-slate-100
            p-8
            text-center
            text-slate-500
            "
          >
            No uploads yet.
          </div>

        ) : (

          <div className="space-y-4">

            {recentUploads.map(
              (resource) => (

                <div
                  key={resource.id}
                  className="
                  bg-white
                  rounded-2xl
                  border
                  border-slate-100
                  p-4
                  lg:p-5
                  "
                >

                  <div
                    className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    "
                  >

                    <div className="min-w-0">

                      <h3
                        className="
                        font-semibold
                        text-base
                        lg:text-lg
                        truncate
                        "
                      >
                        {resource.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">

                        {resource.subject}
                        {" • "}
                        {resource.type}

                      </p>

                    </div>

                    <div>

                      {resource.status ===
                        "approved" && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                          Approved
                        </span>
                      )}

                      {resource.status ===
                        "pending" && (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                          Pending
                        </span>
                      )}

                      {resource.status ===
                        "rejected" && (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                          Rejected
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}