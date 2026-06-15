import {
  FaBell,
  FaSearch,
  FaBars,
} from "react-icons/fa";

import { logoutUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({
  setSidebarOpen,
}) {
  const { userData } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header
      className="
      h-20
      bg-white
      border-b
      border-slate-200
      px-4
      sm:px-6
      lg:px-8
      flex
      items-center
      justify-between
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
          lg:hidden
          text-xl
          "
        >
          <FaBars />
        </button>

        <div className="relative hidden md:block w-72 lg:w-96">

          <FaSearch
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search resources..."
            className="
            w-full
            bg-slate-100
            rounded-xl
            py-3
            pl-12
            pr-4
            outline-none
            "
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3 sm:gap-5">

        <button className="relative text-slate-600">

          <FaBell size={18} />

          <span
            className="
            absolute
            -top-1
            -right-1
            w-2
            h-2
            bg-red-500
            rounded-full
            "
          />

        </button>

        <div className="hidden sm:flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">

            {userData?.name?.charAt(0)}

          </div>

          <div>

            <p className="font-semibold text-sm">
              {userData?.name}
            </p>

            <p className="text-xs text-slate-500">
              {userData?.role}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="
          bg-slate-100
          hover:bg-slate-200
          px-3
          py-2
          rounded-xl
          text-sm
          "
        >
          Logout
        </button>

      </div>

    </header>
  );
}