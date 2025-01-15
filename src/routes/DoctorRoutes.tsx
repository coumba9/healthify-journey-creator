import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import SchedulePage from "@/pages/dashboard/doctor/SchedulePage";
import PatientsPage from "@/pages/dashboard/doctor/PatientsPage";
import AddPatientPage from "@/pages/dashboard/doctor/AddPatientPage";
import MedicalRecordPage from "@/pages/dashboard/doctor/MedicalRecordPage";
import AppointmentDetailsPage from "@/pages/dashboard/doctor/AppointmentDetailsPage";
import AvailabilityPage from "@/pages/dashboard/doctor/AvailabilityPage";

export const DoctorRoutes = () => {
  return (
    <>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/schedule"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <SchedulePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/patients"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <PatientsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/patients/add"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <AddPatientPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/patients/:patientId/medical-record"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <MedicalRecordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/appointments/:appointmentId"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <AppointmentDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/availability"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <AvailabilityPage />
          </ProtectedRoute>
        }
      />
    </>
  );
};