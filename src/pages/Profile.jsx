import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getUserProfile,
  updateUserProfile,
} from "../services/userService";

export default function Profile() {

  const { user } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    const data =
      await getUserProfile(
        user.uid
      );

    setProfile(data);

  };

  const handleUpdate =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await updateUserProfile(
          user.uid,
          {
            name:
              profile.name,
          }
        );

        alert(
          "Profile Updated"
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  if (!profile) {

    return (
      <DashboardLayout>

        <div className="text-center py-20">
          Loading...
        </div>

      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold tracking-tight">
            My Profile
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your personal information and account details.
          </p>

        </div>

        {/* Profile Card */}

        <div
          className="
          bg-white
          rounded-3xl
          border
          border-slate-100
          shadow-sm
          p-6
          mb-6
          "
        >

          <div className="flex items-center gap-5">

            <div
              className="
              w-20
              h-20
              rounded-full
              bg-purple-600
              text-white
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {profile.name?.charAt(0)}
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                {profile.name}
              </h2>

              <p className="text-slate-500 capitalize">
                {profile.role}
              </p>

            </div>

          </div>

        </div>

        {/* Form */}

        <div
          className="
          bg-white
          rounded-3xl
          border
          border-slate-100
          shadow-sm
          p-6
          "
        >

          <form
            onSubmit={handleUpdate}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name:
                      e.target.value,
                  })
                }
                className="
                w-full
                bg-slate-100
                rounded-xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-purple-500
                "
              />

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="block mb-2 font-medium">
                  Email
                </label>

                <input
                  value={profile.email}
                  disabled
                  className="
                  w-full
                  bg-slate-50
                  rounded-xl
                  p-4
                  text-slate-500
                  "
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Role
                </label>

                <input
                  value={profile.role}
                  disabled
                  className="
                  w-full
                  bg-slate-50
                  rounded-xl
                  p-4
                  text-slate-500
                  capitalize
                  "
                />

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="block mb-2 font-medium">
                  Course
                </label>

                <input
                  value={profile.course}
                  disabled
                  className="
                  w-full
                  bg-slate-50
                  rounded-xl
                  p-4
                  text-slate-500
                  "
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Branch
                </label>

                <input
                  value={profile.branch}
                  disabled
                  className="
                  w-full
                  bg-slate-50
                  rounded-xl
                  p-4
                  text-slate-500
                  "
                />

              </div>

            </div>

            <button
              disabled={loading}
              className="
              bg-purple-600
              hover:bg-purple-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              transition
              "
            >
              {loading
                ? "Saving..."
                : "Update Profile"}
            </button>

          </form>

        </div>

      </div>

    </DashboardLayout>

  );
}