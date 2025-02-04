import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import { publicRoutes } from "./routes/publicRoutes";
import { patientRoutes } from "./routes/patientRoutes";
import { doctorRoutes } from "./routes/doctorRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {publicRoutes}
            {dashboardRoutes}
            {patientRoutes}
            {doctorRoutes}
            {adminRoutes}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;