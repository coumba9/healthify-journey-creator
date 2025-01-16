import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Settings, 
  FileText, 
  Calendar,
  AlertCircle,
  Bell,
  Shield,
  Database
} from "lucide-react";

const AdminSection = () => {
  const adminActions = [
    {
      title: "Gestion des utilisateurs",
      description: "Gérer les comptes et les permissions",
      icon: Users,
      action: "Gérer",
      color: "text-blue-500",
    },
    {
      title: "Configuration système",
      description: "Paramètres et préférences",
      icon: Settings,
      action: "Configurer",
      color: "text-green-500",
    },
    {
      title: "Rapports",
      description: "Analyses et statistiques",
      icon: FileText,
      action: "Voir",
      color: "text-purple-500",
    },
    {
      title: "Planning",
      description: "Gestion des horaires",
      icon: Calendar,
      action: "Planifier",
      color: "text-orange-500",
    },
    {
      title: "Alertes",
      description: "Centre de notifications",
      icon: AlertCircle,
      action: "Vérifier",
      color: "text-red-500",
    },
    {
      title: "Notifications",
      description: "Paramètres de notification",
      icon: Bell,
      action: "Configurer",
      color: "text-yellow-500",
    },
    {
      title: "Sécurité",
      description: "Paramètres de sécurité",
      icon: Shield,
      action: "Gérer",
      color: "text-indigo-500",
    },
    {
      title: "Base de données",
      description: "Gestion des données",
      icon: Database,
      action: "Administrer",
      color: "text-cyan-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Actions rapides</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {adminActions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <action.icon className={`h-5 w-5 ${action.color} mr-2`} />
              <CardTitle className="text-sm font-medium">
                {action.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {action.description}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                {action.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSection;