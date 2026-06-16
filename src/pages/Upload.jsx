import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { createResource } from "../services/resourceService";
import { useAuth } from "../context/AuthContext";

import {
  COURSES,
  BRANCHES,
  YEARS,
  SEMESTERS,
  RESOURCE_TYPES,
  SUBJECTS,
} from "../utils/constants";

export default function Upload() {
  const { user, userData } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");

  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [subject, setSubject] = useState("");
  const availableSubjects = SUBJECTS?.[branch]?.[year]?.[semester] || [];

  const [type, setType] = useState("notes");

  const [resourceUrl, setResourceUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !course ||
      !branch ||
      !year ||
      !semester ||
      !subject ||
      !resourceUrl
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createResource({
        title,
        description,

        course,
        branch,

        year,
        semester,

        subject,

        type,

        resourceUrl,

        uploaderId: user.uid,
        uploaderName: userData?.name || "Unknown",

        status: "pending",
      });

      alert("Resource submitted successfully.");

      setTitle("");
      setDescription("");

      setCourse("");
      setBranch("");

      setYear("");
      setSemester("");

      setSubject("");

      setType("notes");

      setResourceUrl("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Upload Resource</h1>

          <p className="text-slate-500 mt-2">
            Share notes, PYQs and learning resources with students.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Form */}

          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="
            bg-white
            rounded-3xl
            border
            border-slate-100
            shadow-sm
            p-6
            space-y-4
            "
            >
              <input
                type="text"
                placeholder="Resource Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
              w-full
              bg-slate-100
              rounded-xl
              p-4
              outline-none
              "
              />

              <textarea
                rows="4"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="
              w-full
              bg-slate-100
              rounded-xl
              p-4
              outline-none
              "
              />

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="bg-slate-100 rounded-xl p-4"
                >
                  <option value="">Select Course</option>

                  {COURSES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  value={branch}
                  onChange={(e) => {
                    setBranch(e.target.value);
                    setYear("");
                    setSemester("");
                    setSubject("");
                  }}
                  className="bg-slate-100 rounded-xl p-4"
                >
                  <option value="">Select Branch</option>

                  {BRANCHES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setSubject("");
                  }}
                  className="bg-slate-100 rounded-xl p-4"
                >
                  <option value="">Select Year</option>

                  {YEARS.map((item) => (
                    <option key={item} value={item}>
                      Year {item}
                    </option>
                  ))}
                </select>

                <select
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    setSubject("");
                  }}
                  className="bg-slate-100 rounded-xl p-4"
                >
                  <option value="">Select Semester</option>

                  {SEMESTERS.map((item) => (
                    <option key={item} value={item}>
                      Semester {item}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-100 rounded-xl p-4 w-full"
              >
                <option value="">Select Subject</option>

                {availableSubjects.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-slate-100 rounded-xl p-4 w-full"
              >
                {RESOURCE_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item.toUpperCase()}
                  </option>
                ))}
              </select>

              <input
                type="url"
                placeholder={
                  type === "video"
                    ? "YouTube Video Link"
                    : "Google Drive / OneDrive / Dropbox Link"
                }
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                className="
              w-full
              bg-slate-100
              rounded-xl
              p-4
              outline-none
              "
              />

              <button
                type="submit"
                disabled={loading}
                className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              text-white
              py-4
              rounded-xl
              font-medium
              "
              >
                {loading ? "Submitting..." : "Submit Resource"}
              </button>
            </form>
          </div>

          {/* Right Panel */}

          <div
            className="
          bg-white
          rounded-3xl
          border
          border-slate-100
          shadow-sm
          p-6
          h-fit
          "
          >
            <h3 className="text-xl font-semibold">Upload Guidelines</h3>

            <div className="mt-5 space-y-4">
              <div>
                <h4 className="font-medium">📄 Notes & PYQs</h4>

                <p className="text-sm text-slate-500 mt-1">
                  Upload PDFs using Google Drive, Dropbox or OneDrive.
                </p>
              </div>

              <div>
                <h4 className="font-medium">🎥 Video Resources</h4>

                <p className="text-sm text-slate-500 mt-1">
                  Use public YouTube links only.
                </p>
              </div>

              <div>
                <h4 className="font-medium">✅ Admin Review</h4>

                <p className="text-sm text-slate-500 mt-1">
                  Every resource is reviewed before being published.
                </p>
              </div>

              <div>
                <h4 className="font-medium">🚫 Avoid</h4>

                <p className="text-sm text-slate-500 mt-1">
                  Duplicate, broken or copyrighted content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
