import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  Calendar,
  FileText,
  Users,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const DashboardNav = () => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case "patient":
        return [
          { title: "Accueil", icon: Home, url: "/dashboard" },
          { title: "Rendez-vous", icon: Calendar, url: "/dashboard/appointments" },
          { title: "Documents", icon: FileText, url: "/dashboard/documents" },
          { title: "Messages", icon: MessageSquare, url: "/dashboard/messages" },
          { title: "Notifications", icon: Bell, url: "/dashboard/notifications" },
        ];
      case "doctor":
        return [
          { title: "Accueil", icon: Home, url: "/dashboard" },
          { title: "Planning", icon: Calendar, url: "/dashboard/schedule" },
          { title: "Patients", icon: Users, url: "/dashboard/patients" },
          { title: "Documents", icon: FileText, url: "/dashboard/doctor/documents" },
          { title: "Messages", icon: MessageSquare, url: "/dashboard/doctor/messages" },
        ];
      case "admin":
        return [
          { title: "Accueil", icon: Home, url: "/dashboard" },
          { title: "Utilisateurs", icon: Users, url: "/dashboard/users" },
          { title: "Services", icon: FileText, url: "/dashboard/services" },
          { title: "Paramètres", icon: Settings, url: "/dashboard/settings" },
        ];
      default:
        return [];
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === "patient"
              ? "Espace Patient"
              : user?.role === "doctor"
              ? "Espace Médecin"
              : "Administration"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardNav;