import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import SchedulePage from "@/pages/dashboard/doctor/SchedulePage";
import PatientsPage from "@/pages/dashboard/doctor/PatientsPage";
import DocumentsPage from "@/pages/dashboard/doctor/DocumentsPage";
import MessagesPage from "@/pages/dashboard/doctor/MessagesPage";

export const DoctorRoutes = () => [
  <Route
    key="/dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DoctorDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/schedule"
    path="/dashboard/schedule"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <SchedulePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/patients"
    path="/dashboard/patients"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <PatientsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/documents"
    path="/dashboard/documents"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DocumentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/messages"
    path="/dashboard/messages"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <MessagesPage />
      </ProtectedRoute>
    }
  />
];