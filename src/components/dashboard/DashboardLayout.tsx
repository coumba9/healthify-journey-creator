
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNav from "./DashboardNav";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/ui/back-button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("DashboardLayout user:", user);
    if (!user) {
      console.log("No user found in DashboardLayout, redirecting to login");
      toast({
        title: "Accès non autorisé",
        description: "Veuillez vous connecter pour accéder à cette page",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [user, navigate, toast]);

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardNav />
        <main className="flex-1 p-6 bg-gray-50">
          <BackButton />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
