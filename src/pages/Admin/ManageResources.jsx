import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getPendingResources,
  approveResource,
  rejectResource,
  deleteResource,
} from "../../services/resourceService";

export default function ManageResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadResources = async () => {
    try {
      const data = await getPendingResources();
      setResources(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveResource(id);

      setResources((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Resource Approved");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectResource(id);

      setResources((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Resource Rejected");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this resource permanently?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResource(id);

      setResources((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Resource Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Pending Resources
      </h1>

      {resources.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          No Pending Resources
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Subject
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Uploader
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {resources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {resource.title}
                  </td>

                  <td className="p-4">
                    {resource.subject}
                  </td>

                  <td className="p-4 capitalize">
                    {resource.type}
                  </td>

                  <td className="p-4">
                    {resource.uploaderName}
                  </td>

                  <td className="p-4 flex gap-2">

                    <a
                      href={resource.resourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </a>

                    <button
                      onClick={() =>
                        handleApprove(resource.id)
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleReject(resource.id)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(resource.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}
    </DashboardLayout>
  );
}