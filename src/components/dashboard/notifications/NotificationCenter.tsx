import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
}

const NotificationCenter = () => {
  const { toast } = useToast();

  // Exemple de notifications (à remplacer par des vraies données plus tard)
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Nouveau rendez-vous",
      message: "Vous avez un nouveau rendez-vous le 20 mars à 14h00",
      type: "info",
      timestamp: "2024-03-15T10:00:00",
      read: false,
    },
    {
      id: "2",
      title: "Rappel",
      message: "N'oubliez pas votre rendez-vous demain à 9h00",
      type: "warning",
      timestamp: "2024-03-14T15:30:00",
      read: false,
    },
  ];

  const markAsRead = (notificationId: string) => {
    toast({
      title: "Notification marquée comme lue",
      description: "La notification a été marquée comme lue avec succès.",
    });
  };

  const deleteNotification = (notificationId: string) => {
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée avec succès.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifications
        </h2>
        <Button variant="outline" size="sm" onClick={() => markAsRead("all")}>
          Tout marquer comme lu
        </Button>
      </div>

      <ScrollArea className="h-[500px] rounded-md border p-4">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.read ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationCenter;