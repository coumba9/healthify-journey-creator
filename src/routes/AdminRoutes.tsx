import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import UsersPage from "@/pages/dashboard/admin/UsersPage";
import ServicesPage from "@/pages/dashboard/admin/ServicesPage";
import SettingsPage from "@/pages/dashboard/admin/SettingsPage";

export const AdminRoutes = () => [
  <Route
    key="/dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/users"
    path="/dashboard/users"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <UsersPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/services"
    path="/dashboard/services"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <ServicesPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/settings"
    path="/dashboard/settings"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <SettingsPage />
      </ProtectedRoute>
    }
  />
];