import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  getResourceById,
  addBookmark,
} from "../services/resourceService";

import { useAuth } from "../context/AuthContext";

export default function ResourceDetails() {
  const { id } = useParams();

  const { user } = useAuth();

  const [resource, setResource] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadResource();
  }, []);

  const loadResource = async () => {
    try {
      const data =
        await getResourceById(id);

      setResource(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    try {
      await addBookmark(
        user.uid,
        resource.id
      );

      alert(
        "Resource added to bookmarks ⭐"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to add bookmark"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!resource) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          Resource not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow p-8">

          {/* Header */}

          <div className="mb-6">

            <h1 className="text-3xl font-bold">
              {resource.title}
            </h1>

            <p className="text-gray-500 mt-3">
              {resource.description}
            </p>

          </div>

          {/* Resource Information */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-3">

              <p>
                <strong>Course:</strong>{" "}
                {resource.course}
              </p>

              <p>
                <strong>Branch:</strong>{" "}
                {resource.branch}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {resource.year}
              </p>

              <p>
                <strong>Semester:</strong>{" "}
                {resource.semester}
              </p>

            </div>

            <div className="space-y-3">

              <p>
                <strong>Subject:</strong>{" "}
                {resource.subject}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {resource.type}
              </p>

              <p>
                <strong>Uploaded By:</strong>{" "}
                {resource.uploaderName}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {resource.status}
              </p>

            </div>

          </div>

          {/* Action Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href={resource.resourceUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
            >
              Open Resource
            </a>

            <button
              onClick={handleBookmark}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
            >
              ⭐ Bookmark
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}