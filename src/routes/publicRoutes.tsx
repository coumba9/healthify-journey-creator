
import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import DoctorsPage from "@/pages/DoctorsPage";
import DoctorProfilePage from "@/pages/DoctorProfilePage";
import FAQ from "@/pages/FAQ";
import FirstAid from "@/pages/FirstAid";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Services from "@/pages/Services";
import Documentation from "@/pages/Documentation";
import Appointment from "@/pages/Appointment";

export const publicRoutes = [
  <Route key="home" path="/" element={<Index />} />,
  <Route key="about" path="/about" element={<About />} />,
  <Route key="contact" path="/contact" element={<Contact />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route key="reset-password" path="/reset-password" element={<ResetPassword />} />,
  <Route key="doctors" path="/doctors" element={<DoctorsPage />} />,
  <Route key="doctor-profile" path="/doctors/:id" element={<DoctorProfilePage />} />,
  <Route key="faq" path="/faq" element={<FAQ />} />,
  <Route key="first-aid" path="/first-aid" element={<FirstAid />} />,
  <Route key="features" path="/features" element={<Features />} />,
  <Route key="pricing" path="/pricing" element={<Pricing />} />,
  <Route key="services" path="/services" element={<Services />} />,
  <Route key="documentation" path="/documentation" element={<Documentation />} />,
  <Route key="appointment" path="/appointment" element={<Appointment />} />,
];
