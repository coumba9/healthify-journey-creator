import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import FAQ from "@/pages/FAQ";
import Pricing from "@/pages/Pricing";
import Features from "@/pages/Features";
import FirstAid from "@/pages/FirstAid";

export const publicRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/features" element={<Features />} />
    <Route path="/first-aid" element={<FirstAid />} />
  </>
);