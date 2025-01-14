import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages publiques
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// Tableaux de bord
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// Pages du patient
import AppointmentsPage from "./pages/dashboard/appointments/AppointmentsPage";
import DocumentsPage from "./pages/dashboard/documents/DocumentsPage";
import MessagesPage from "./pages/dashboard/messages/MessagesPage";
import NotificationsPage from "./pages/dashboard/notifications/NotificationsPage";
import HistoryPage from "./pages/dashboard/history/HistoryPage";
import PaymentsPage from "./pages/dashboard/payments/PaymentsPage";
import PrescriptionsPage from "./pages/dashboard/prescriptions/PrescriptionsPage";

// Pages du médecin
import SchedulePage from "./pages/dashboard/doctor/SchedulePage";
import PatientsPage from "./pages/dashboard/doctor/PatientsPage";
import AddPatientPage from "./pages/dashboard/doctor/AddPatientPage";
import MedicalRecordPage from "./pages/dashboard/doctor/MedicalRecordPage";

// Pages de l'administrateur
import UsersPage from "./pages/dashboard/admin/UsersPage";
import ServicesPage from "./pages/dashboard/admin/ServicesPage";
import SettingsPage from "./pages/dashboard/admin/SettingsPage";
import UserDetailsPage from "./pages/dashboard/admin/UserDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />

            {/* Route du tableau de bord */}
            <Route
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
            />

            {/* Routes du patient */}
            <Route
              path="/dashboard/appointments"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AppointmentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/documents"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <DocumentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/messages"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/notifications"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/history"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/payments"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PaymentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/prescriptions"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PrescriptionsPage />
                </ProtectedRoute>
              }
            />

            {/* Routes du médecin */}
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

            {/* Routes de l'administrateur */}
            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users/:userId"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/services"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ServicesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
