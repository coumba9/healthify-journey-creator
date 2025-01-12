import { Bell, Check, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error";
  date: string;
  read: boolean;
}

const NotificationsPage = () => {
  const { toast } = useToast();

  // Exemple de notifications (à remplacer par des données réelles avec Supabase plus tard)
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Nouveau rendez-vous confirmé",
      description: "Votre rendez-vous du 15 mars a été confirmé",
      type: "success",
      date: "2024-03-10",
      read: false,
    },
    {
      id: "2",
      title: "Rappel de consultation",
      description: "N'oubliez pas votre consultation demain à 14h",
      type: "info",
      date: "2024-03-11",
      read: false,
    },
    {
      id: "3",
      title: "Document disponible",
      description: "Votre ordonnance est disponible dans votre espace personnel",
      type: "info",
      date: "2024-03-09",
      read: true,
    },
  ];

  const handleMarkAsRead = (notificationId: string) => {
    toast({
      title: "Notification marquée comme lue",
      description: "La notification a été mise à jour",
    });
  };

  const handleDelete = (notificationId: string) => {
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée avec succès",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Bell className="h-6 w-6 text-gray-500" />
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`transform transition-all duration-300 hover:scale-[1.02] animate-fade-up ${
                notification.read ? "opacity-70" : ""
              }`}
            >
              <Alert
                className={`border-l-4 ${
                  notification.type === "success"
                    ? "border-l-green-500"
                    : notification.type === "warning"
                    ? "border-l-yellow-500"
                    : notification.type === "error"
                    ? "border-l-red-500"
                    : "border-l-blue-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <AlertTitle className="text-lg font-semibold mb-2">
                      {notification.title}
                    </AlertTitle>
                    <AlertDescription>
                      <p className="text-gray-600">{notification.description}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        {new Date(notification.date).toLocaleDateString()}
                      </p>
                    </AlertDescription>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Marquer comme lu"
                      >
                        <Check className="h-5 w-5 text-green-500" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      title="Supprimer"
                    >
                      <X className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </Alert>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune notification</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;