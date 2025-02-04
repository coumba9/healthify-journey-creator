import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const publicRoutes = [
  <Route key="index" path="/" element={<Index />} />,
  <Route key="about" path="/about" element={<About />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route key="reset-password" path="/reset-password" element={<ResetPassword />} />,
  <Route key="contact" path="/contact" element={<Contact />} />,
  <Route
    key="services"
    path="/services"
    element={
      <ProtectedRoute>
        <Services />
      </ProtectedRoute>
    }
  />,
];