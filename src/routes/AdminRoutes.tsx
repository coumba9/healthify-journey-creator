import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import UsersPage from "@/pages/dashboard/admin/UsersPage";
import ServicesPage from "@/pages/dashboard/admin/ServicesPage";
import SettingsPage from "@/pages/dashboard/admin/SettingsPage";

export const AdminRoutes = () => (
  <>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/users"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <UsersPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/services"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <ServicesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/settings"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <SettingsPage />
        </ProtectedRoute>
      }
    />
  </>
);