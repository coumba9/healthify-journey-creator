import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PatientDashboard from "@/pages/dashboard/PatientDashboard";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";

export const dashboardRoutes = [
  <Route
    key="dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute>
        {({ user }) => {
          switch (user.role) {
            case "patient":
              return <PatientDashboard />;
            case "doctor":
              return <DoctorDashboard />;
            case "admin":
              return <AdminDashboard />;
            default:
              return null;
          }
        }}
      </ProtectedRoute>
    }
  />,
];