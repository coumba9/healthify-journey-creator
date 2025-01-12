import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  FileText,
  MessageSquare,
  Bell,
  User,
  ClipboardList,
  Pill,
  CreditCard,
} from "lucide-react";

const PatientDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const quickLinks = [
    {
      icon: CalendarIcon,
      title: "Rendez-vous",
      description: "Gérer vos rendez-vous",
      path: "/dashboard/appointments",
      color: "text-blue-500",
    },
    {
      icon: FileText,
      title: "Documents",
      description: "Accéder à vos documents médicaux",
      path: "/dashboard/documents",
      color: "text-green-500",
    },
    {
      icon: MessageSquare,
      title: "Messages",
      description: "Communiquer avec vos médecins",
      path: "/dashboard/messages",
      color: "text-purple-500",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Voir vos notifications",
      path: "/dashboard/notifications",
      color: "text-yellow-500",
    },
    {
      icon: User,
      title: "Profil",
      description: "Gérer votre profil",
      path: "/dashboard/profile",
      color: "text-indigo-500",
    },
    {
      icon: ClipboardList,
      title: "Historique",
      description: "Voir votre historique médical",
      path: "/dashboard/history",
      color: "text-red-500",
    },
    {
      icon: Pill,
      title: "Prescriptions",
      description: "Gérer vos ordonnances",
      path: "/dashboard/prescriptions",
      color: "text-teal-500",
    },
    {
      icon: CreditCard,
      title: "Paiements",
      description: "Gérer vos paiements",
      path: "/dashboard/payments",
      color: "text-orange-500",
    },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
    toast({
      title: "Navigation",
      description: "Redirection vers " + path,
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Tableau de bord Patient
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCardClick(link.path)}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer border-l-4 hover:scale-105 transform transition-transform">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <link.icon className={`h-6 w-6 ${link.color}`} />
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary-600" />
                Prochain rendez-vous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" className="rounded-md border" />
              <div className="mt-4">
                <Button
                  className="w-full"
                  onClick={() => handleCardClick("/dashboard/appointments")}
                >
                  Voir tous les rendez-vous
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary-600" />
                Dernières notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium">Nouveau message de Dr. Smith</p>
                <p className="text-sm text-gray-500">Il y a 2 heures</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">Rendez-vous confirmé</p>
                <p className="text-sm text-gray-500">Il y a 1 jour</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleCardClick("/dashboard/notifications")}
              >
                Voir toutes les notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;