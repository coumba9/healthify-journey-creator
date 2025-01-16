import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStats from "@/components/dashboard/stats/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Settings, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Gestion des utilisateurs",
      icon: Users,
      description: "Gérer les comptes des patients et médecins",
      link: "/dashboard/users",
    },
    {
      title: "Services médicaux",
      icon: FileText,
      description: "Configurer les services disponibles",
      link: "/dashboard/services",
    },
    {
      title: "Paramètres",
      icon: Settings,
      description: "Configurer les paramètres du système",
      link: "/dashboard/settings",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
          <span className="text-gray-500">
            Bienvenue, {user?.name || user?.email}
          </span>
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-3">
          {quickActions.map((action) => (
            <Card key={action.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <action.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{action.description}</p>
                <Link
                  to={action.link}
                  className="text-primary hover:underline inline-flex items-center gap-2"
                >
                  Accéder
                  <span className="text-lg">→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;