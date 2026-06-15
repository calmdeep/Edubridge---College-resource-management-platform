import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBook,
  FaUpload,
  FaBookmark,
  FaUser,
  FaUsers,
  FaClipboardCheck,
  FaCog,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { userData } = useAuth();

  const location = useLocation();

  const menuItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";

  const active =
    "bg-purple-600 text-white shadow";

  const normal =
    "text-slate-300 hover:bg-white/10 hover:text-white";

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
          fixed
          inset-0
          bg-black/40
          z-40
          lg:hidden
          "
        />
      )}

      <aside
        className={`
        fixed
        left-0
        top-0
        h-screen
        w-72
        bg-[#1E1B4B]
        border-r
        border-purple-900
        z-50
        transition-transform
        duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0
        `}
      >
        {/* Mobile Close */}

        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
          lg:hidden
          absolute
          top-5
          right-5
          text-white
          "
        >
          <FaTimes />
        </button>

        {/* Logo */}

        <div className="p-6 border-b border-purple-900">
          <p className="text-slate-400 text-sm mt-1">
            College Resource Platform
          </p>

        </div>

        {/* User */}

        <div className="px-6 py-5">

          <div className="bg-white/5 rounded-2xl p-4">

            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">

              {userData?.name?.charAt(0)}

            </div>

            <h3 className="text-white mt-3 font-semibold">
              {userData?.name}
            </h3>

            <p className="text-slate-400 text-sm">
              {userData?.role}
            </p>

          </div>

        </div>

        <nav className="px-4 space-y-2">

          <Link
            to="/dashboard"
            onClick={() =>
              setSidebarOpen(false)
            }
            className={`${menuItem}
            ${
              location.pathname ===
              "/dashboard"
                ? active
                : normal
            }`}
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/resources"
            onClick={() =>
              setSidebarOpen(false)
            }
            className={`${menuItem}
            ${
              location.pathname ===
              "/resources"
                ? active
                : normal
            }`}
          >
            <FaBook />
            Resources
          </Link>

          <Link
            to="/upload"
            onClick={() =>
              setSidebarOpen(false)
            }
            className={`${menuItem}
            ${
              location.pathname ===
              "/upload"
                ? active
                : normal
            }`}
          >
            <FaUpload />
            Upload Resource
          </Link>

          <Link
            to="/my-uploads"
            onClick={() =>
              setSidebarOpen(false)
            }
            className={`${menuItem}
            ${
              location.pathname ===
              "/my-uploads"
                ? active
                : normal
            }`}
          >
            <FaClipboardCheck />
            My Uploads
          </Link>

          <Link
            to="/my-bookmarks"
            onClick={() =>
              setSidebarOpen(false)
            }
            className={`${menuItem}
            ${
              location.pathname ===
              "/my-bookmarks"
                ? active
                : normal
            }`}
          >
            <FaBookmark />
            Bookmarks
          </Link>

          <Link
            to="/profile"
            onClick={() =>
              setSidebarOpen(false)
            }
            className={`${menuItem}
            ${
              location.pathname ===
              "/profile"
                ? active
                : normal
            }`}
          >
            <FaUser />
            Profile
          </Link>

        </nav>
      </aside>
    </>
  );
}