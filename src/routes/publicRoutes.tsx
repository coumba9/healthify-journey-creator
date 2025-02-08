import { Route } from "react-router-dom";
import DoctorsPage from "@/pages/DoctorsPage";
import HomePage from "@/pages/HomePage"; // Example of existing route
import AboutPage from "@/pages/AboutPage"; // Example of existing route
import ContactPage from "@/pages/ContactPage"; // Example of existing route

export const publicRoutes = (
  <>
    <Route path="/doctors" element={<DoctorsPage />} />
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
  </>
);
