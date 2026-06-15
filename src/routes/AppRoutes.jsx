import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AdminRoute from "./AdminRoute";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";
import MyUploads from "../pages/MyUploads";
import ManageResources from "../pages/Admin/ManageResources";
import Resources from "../pages/Resources";
import ResourceDetails from "../pages/ResourceDetails";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import MyBookmarks from "../pages/MyBookmarks";
import ManageUsers from "../pages/Admin/ManageUsers";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-uploads"
        element={
          <ProtectedRoute>
            <MyUploads />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/resources"
        element={
          <AdminRoute>
            <ManageResources />
          </AdminRoute>
        }
      />
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources/:id"
        element={
          <ProtectedRoute>
            <ResourceDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookmarks"
        element={
          <ProtectedRoute>
            <MyBookmarks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
