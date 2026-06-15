import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getAllUsers,
  makeAdmin,
} from "../../services/userService";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data =
      await getAllUsers();

    setUsers(data);
  };

  const handleMakeAdmin =
    async (userId) => {

      await makeAdmin(userId);

      loadUsers();
    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Course
              </th>

              <th className="p-4">
                Branch
              </th>

              <th className="p-4">
                Role
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.course}
                </td>

                <td className="p-4">
                  {user.branch}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  {user.role !== "admin" && (

                    <button
                      onClick={() =>
                        handleMakeAdmin(
                          user.id
                        )
                      }
                      className="bg-purple-600 text-white px-4 py-2 rounded"
                    >
                      Make Admin
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}