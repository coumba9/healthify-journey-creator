import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, FileText, MessageSquare, Bell } from "lucide-react";

const PatientDashboard = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `Action ${action}`,
      description: `L'action a été effectuée avec succès.`,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Tableau de bord Patient
        </h1>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
        >
          <motion.div variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary-600" />
                  Prochain rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Calendar mode="single" className="rounded-md border" />
                <div className="mt-4 space-x-2">
                  <Button 
                    onClick={() => handleAction("confirmée")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirmer
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction("reportée")}
                    className="hover:bg-primary-50"
                  >
                    Reporter
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleAction("annulée")}
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary-600" />
                  Nouveau rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AppointmentForm />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-600" />
                  Documents récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-primary-50 transition-colors duration-200">
                    <span>Ordonnance - 15/03/2024</span>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary-600" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded hover:bg-primary-50 transition-colors duration-200">
                    <p className="font-medium">Dr. Smith</p>
                    <p className="text-sm text-gray-600">
                      Dernier message reçu le 20/03/2024
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;