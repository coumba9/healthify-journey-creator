import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const publicRoutes = [
  <Route key="index" path="/" element={<Index />} />,
  <Route key="about" path="/about" element={<About />} />,
  <Route key="features" path="/features" element={<Features />} />,
  <Route key="pricing" path="/pricing" element={<Pricing />} />,
  <Route key="faq" path="/faq" element={<FAQ />} />,
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