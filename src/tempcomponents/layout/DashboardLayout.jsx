import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="bg-slate-50 min-h-screen">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:ml-72 min-h-screen">

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 sm:p-6 lg:p-8">

          {children}

        </main>

      </div>

    </div>
  );
}