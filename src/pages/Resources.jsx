import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import { getApprovedResources } from "../services/resourceService";

import {
  COURSES,
  BRANCHES,
  YEARS,
  SEMESTERS,
  RESOURCE_TYPES,
  SUBJECTS,
} from "../utils/constants";

export default function Resources() {
  const [resources, setResources] = useState([]);

  const [search, setSearch] = useState("");

  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");

  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [subject, setSubject] = useState("");
  const availableSubjects = SUBJECTS?.[branch]?.[year]?.[semester] || [];
  const [type, setType] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    const data = await getApprovedResources();
    setResources(data);
  };

  const filteredResources = resources.filter((resource) => {
    return (
      resource.title.toLowerCase().includes(search.toLowerCase()) &&
      (!course || resource.course === course) &&
      (!branch || resource.branch === branch) &&
      (!year || resource.year === year) &&
      (!semester || resource.semester === semester) &&
      (!subject || resource.subject === subject) &&
      (!type || resource.type === type)
    );
  });

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Resource Library
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Browse notes, PYQs and study resources.
        </p>
      </div>

      {/* Search + Filters */}

      <div
        className="
bg-white
rounded-3xl
border
border-slate-100
p-4
sm:p-6
shadow-sm
mb-6
lg:mb-8
"
      >
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
w-full
bg-slate-100
rounded-xl
p-3
sm:p-4
outline-none
focus:ring-2
focus:ring-purple-500
mb-5
"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="bg-slate-100 rounded-xl p-3"
          >
            <option value="">All Courses</option>

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
            className="bg-slate-100 rounded-xl p-3"
          >
            <option value="">All Branches</option>

            {BRANCHES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setSubject("");
            }}
            className="bg-slate-100 rounded-xl p-3"
          >
            <option value="">All Semesters</option>

            {SEMESTERS.map((item) => (
              <option key={item} value={item}>
                Semester {item}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setSubject("");
            }}
            className="bg-slate-100 rounded-xl p-3"
          >
            <option value="">All Years</option>

            {YEARS.map((item) => (
              <option key={item} value={item}>
                Year {item}
              </option>
            ))}
          </select>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-slate-100 rounded-xl p-3"
          >
            <option value="">All Subjects</option>

            {availableSubjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-slate-100 rounded-xl p-3"
          >
            <option value="">All Types</option>

            {RESOURCE_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources */}

      <div className="space-y-4">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="
bg-white
rounded-2xl
border
border-slate-100
p-4
sm:p-5
hover:shadow-md
transition
"
          >
            <div
              className="
  flex
  flex-col
  sm:flex-row
  sm:justify-between
  sm:items-start
  gap-3
  "
            >
              <div>
                <h3 className="font-semibold text-base sm:text-lg break-words">
                  📄 {resource.title}
                </h3>

                <p className="text-slate-500 mt-1">
                  {resource.branch}
                  {" • "}
                  Semester {resource.semester}
                </p>
              </div>

              <span
                className="
  self-start
  bg-purple-100
  text-purple-700
  px-3
  py-1
  rounded-full
  text-xs
  "
              >
                {resource.type}
              </span>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <span
                className="
                  bg-slate-100
                  text-slate-600
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  "
              >
                {resource.subject}
              </span>

              <span
                className="
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  "
              >
                Approved
              </span>
            </div>

            <div className="mt-5">
              <Link
                to={`/resources/${resource.id}`}
                className="
                  bg-purple-600
                  hover:bg-purple-700
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  inline-block
                  "
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
