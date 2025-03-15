
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PatientDashboard from "@/pages/dashboard/PatientDashboard";
import AppointmentsPage from "@/pages/dashboard/appointments/AppointmentsPage";
import HistoryPage from "@/pages/dashboard/history/HistoryPage";
import MessagesPage from "@/pages/dashboard/messages/MessagesPage";
import NotificationsPage from "@/pages/dashboard/notifications/NotificationsPage";
import ProfilePage from "@/pages/dashboard/profile/ProfilePage";
import PatientProfilePage from "@/pages/dashboard/profile/PatientProfilePage";
import DocumentsPage from "@/pages/dashboard/documents/DocumentsPage";
import PrescriptionsPage from "@/pages/dashboard/prescriptions/PrescriptionsPage";
import PaymentsPage from "@/pages/dashboard/payments/PaymentsPage";
import TeleconsultationPage from "@/pages/TeleconsultationPage";

export const patientRoutes = [
  <Route
    key="patient-dashboard"
    path="/dashboard/patient"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PatientDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-appointments"
    path="/dashboard/appointments"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <AppointmentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-history"
    path="/dashboard/history"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <HistoryPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-messages"
    path="/dashboard/messages"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <MessagesPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-notifications"
    path="/dashboard/notifications"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <NotificationsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-profile"
    path="/dashboard/profile"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <ProfilePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-detailed-profile"
    path="/dashboard/patient-profile"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PatientProfilePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-documents"
    path="/dashboard/documents"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <DocumentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-prescriptions"
    path="/dashboard/prescriptions"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PrescriptionsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="patient-payments"
    path="/dashboard/payments"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PaymentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="teleconsultation"
    path="/teleconsultation/:id?"
    element={
      <ProtectedRoute allowedRoles={["patient", "doctor"]}>
        <TeleconsultationPage />
      </ProtectedRoute>
    }
  />,
];
