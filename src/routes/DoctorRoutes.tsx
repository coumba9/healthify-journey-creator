import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import SchedulePage from "@/pages/dashboard/doctor/SchedulePage";
import PatientsPage from "@/pages/dashboard/doctor/PatientsPage";
import DocumentsPage from "@/pages/dashboard/doctor/DocumentsPage";
import MessagesPage from "@/pages/dashboard/doctor/MessagesPage";

const DoctorRoutes = [
  <Route
    key="doctor-dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DoctorDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="doctor-schedule"
    path="/dashboard/schedule"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <SchedulePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="doctor-patients"
    path="/dashboard/patients"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <PatientsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="doctor-documents"
    path="/dashboard/documents"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DocumentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="doctor-messages"
    path="/dashboard/messages"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <MessagesPage />
      </ProtectedRoute>
    }
  />
];

export default DoctorRoutes;