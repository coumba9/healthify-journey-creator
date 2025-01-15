import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PatientDashboard from "@/pages/dashboard/PatientDashboard";
import AppointmentsPage from "@/pages/dashboard/appointments/AppointmentsPage";
import DocumentsPage from "@/pages/dashboard/documents/DocumentsPage";
import MessagesPage from "@/pages/dashboard/messages/MessagesPage";
import NotificationsPage from "@/pages/dashboard/notifications/NotificationsPage";
import HistoryPage from "@/pages/dashboard/history/HistoryPage";
import PaymentsPage from "@/pages/dashboard/payments/PaymentsPage";
import PrescriptionsPage from "@/pages/dashboard/prescriptions/PrescriptionsPage";

export const PatientRoutes = () => [
  <Route
    key="/dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PatientDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/appointments"
    path="/dashboard/appointments"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <AppointmentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/documents"
    path="/dashboard/documents"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <DocumentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/messages"
    path="/dashboard/messages"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <MessagesPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/notifications"
    path="/dashboard/notifications"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <NotificationsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/history"
    path="/dashboard/history"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <HistoryPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/payments"
    path="/dashboard/payments"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PaymentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/dashboard/prescriptions"
    path="/dashboard/prescriptions"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PrescriptionsPage />
      </ProtectedRoute>
    }
  />
];