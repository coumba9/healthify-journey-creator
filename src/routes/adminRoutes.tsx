import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UsersPage from "@/pages/dashboard/admin/UsersPage";
import ServicesPage from "@/pages/dashboard/admin/ServicesPage";
import SettingsPage from "@/pages/dashboard/admin/SettingsPage";
import UserDetailsPage from "@/pages/dashboard/admin/UserDetailsPage";

export const adminRoutes = [
  <Route
    key="users"
    path="/dashboard/users"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <UsersPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="user-details"
    path="/dashboard/users/:userId"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <UserDetailsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="admin-services"
    path="/dashboard/services"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <ServicesPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="settings"
    path="/dashboard/settings"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <SettingsPage />
      </ProtectedRoute>
    }
  />,
];