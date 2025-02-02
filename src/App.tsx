import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Services from "@/pages/Services";
import SearchProfessionals from "@/pages/SearchProfessionals";
import PatientDashboard from "@/pages/dashboard/PatientDashboard";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import ProfilePage from "@/pages/dashboard/profile/ProfilePage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          
          {/* Routes de recherche de professionnels */}
          <Route path="/search" element={<SearchProfessionals />} />
          <Route path="/doctor/:id" element={<SearchProfessionals />} />
          
          {/* Routes protégées */}
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
                      return <PatientDashboard />;
                  }
                }}
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/search"
            element={
              <ProtectedRoute>
                <SearchProfessionals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;