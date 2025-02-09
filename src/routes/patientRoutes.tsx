import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppointmentsPage from "@/pages/dashboard/appointments/AppointmentsPage";
import NewAppointmentForm from "@/components/appointment/NewAppointmentForm";
import DocumentsPage from "@/pages/dashboard/documents/DocumentsPage";
import MessagesPage from "@/pages/dashboard/messages/MessagesPage";
import NotificationsPage from "@/pages/dashboard/notifications/NotificationsPage";

export const patientRoutes = [
  <Route
    key="appointments"
    path="/dashboard/appointments"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <AppointmentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="new-appointment"
    path="/appointment/new"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <NewAppointmentForm />
      </ProtectedRoute>
    }
  />,
  <Route
    key="documents"
    path="/dashboard/documents"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <DocumentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="messages"
    path="/dashboard/messages"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <MessagesPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="notifications"
    path="/dashboard/notifications"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <NotificationsPage />
      </ProtectedRoute>
    }
  />,
];