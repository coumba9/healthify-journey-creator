
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PatientDashboard from "@/pages/dashboard/PatientDashboard";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import AppointmentsPage from "@/pages/dashboard/appointments/AppointmentsPage";

export const dashboardRoutes = [
  <Route
    key="dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute>
        {({ user }) => {
          console.log("Dashboard route user:", user);
          switch (user.role) {
            case "patient":
              return <PatientDashboard />;
            case "doctor":
              return <DoctorDashboard />;
            case "admin":
              return <AdminDashboard />;
            default:
              console.log("Unknown role:", user.role);
              return <PatientDashboard />;
          }
        }}
      </ProtectedRoute>
    }
  />,
  <Route
    key="appointments"
    path="/dashboard/appointments"
    element={
      <ProtectedRoute>
        <AppointmentsPage />
      </ProtectedRoute>
    }
  />
];
