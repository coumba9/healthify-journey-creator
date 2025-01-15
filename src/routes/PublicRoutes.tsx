import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";

export const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </>
  );
};