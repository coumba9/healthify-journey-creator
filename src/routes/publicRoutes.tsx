import { Route } from "react-router-dom";
import DoctorsPage from "@/pages/DoctorsPage";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

export const publicRoutes = (
  <>
    <Route path="/doctors" element={<DoctorsPage />} />
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </>
);