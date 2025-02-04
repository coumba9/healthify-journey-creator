import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SchedulePage from "@/pages/dashboard/doctor/SchedulePage";
import PatientsPage from "@/pages/dashboard/doctor/PatientsPage";
import AddPatientPage from "@/pages/dashboard/doctor/AddPatientPage";
import MedicalRecordPage from "@/pages/dashboard/doctor/MedicalRecordPage";
import AppointmentDetailsPage from "@/pages/dashboard/doctor/AppointmentDetailsPage";
import AvailabilityPage from "@/pages/dashboard/doctor/AvailabilityPage";
import DocumentsPage from "@/pages/dashboard/documents/DocumentsPage";
import MessagesPage from "@/pages/dashboard/messages/MessagesPage";

export const doctorRoutes = [
  <Route
    key="schedule"
    path="/dashboard/schedule"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <SchedulePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patients"
    path="/dashboard/patients"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <PatientsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="add-patient"
    path="/dashboard/patients/add"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <AddPatientPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="medical-record"
    path="/dashboard/patients/:patientId/medical-record"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <MedicalRecordPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="appointment-details"
    path="/dashboard/appointments/:appointmentId"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <AppointmentDetailsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="availability"
    path="/dashboard/availability"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <AvailabilityPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="doctor-documents"
    path="/dashboard/doctor/documents"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DocumentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="doctor-messages"
    path="/dashboard/doctor/messages"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <MessagesPage />
      </ProtectedRoute>
    }
  />,
];