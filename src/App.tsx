import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import { PublicRoutes } from "./routes/PublicRoutes";
import { PatientRoutes } from "./routes/PatientRoutes";
import { DoctorRoutes } from "./routes/DoctorRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <PublicRoutes />
            <PatientRoutes />
            <DoctorRoutes />
            <AdminRoutes />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;