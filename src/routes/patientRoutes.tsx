import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppointmentsPage from "@/pages/dashboard/appointments/AppointmentsPage";
import DocumentsPage from "@/pages/dashboard/documents/DocumentsPage";
import MessagesPage from "@/pages/dashboard/messages/MessagesPage";
import NotificationsPage from "@/pages/dashboard/notifications/NotificationsPage";
import HistoryPage from "@/pages/dashboard/history/HistoryPage";
import PaymentsPage from "@/pages/dashboard/payments/PaymentsPage";
import PrescriptionsPage from "@/pages/dashboard/prescriptions/PrescriptionsPage";
import ProfilePage from "@/pages/dashboard/profile/ProfilePage";

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
  <Route
    key="history"
    path="/dashboard/history"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <HistoryPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="payments"
    path="/dashboard/payments"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PaymentsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="prescriptions"
    path="/dashboard/prescriptions"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PrescriptionsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="profile"
    path="/dashboard/profile"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <ProfilePage />
      </ProtectedRoute>
    }
  />,
];