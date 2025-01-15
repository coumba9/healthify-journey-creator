import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, FileText, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppointmentDetailsPage = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState("pending");

  const handleStartAppointment = () => {
    setStatus("in-progress");
    toast({
      title: "Consultation démarrée",
      description: "La consultation a été démarrée avec succès.",
    });
  };

  const handleReschedule = () => {
    navigate(`/dashboard/appointments/${appointmentId}/reschedule`);
  };

  const handleAddNote = () => {
    navigate(`/dashboard/medical-records/add-note/${appointmentId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Détails du Rendez-vous</h1>
          <div className="space-x-2">
            <Button onClick={handleStartAppointment} className="bg-green-500 hover:bg-green-600">
              <Check className="h-4 w-4 mr-2" />
              Démarrer la consultation
            </Button>
            <Button variant="outline" onClick={handleReschedule}>
              <Clock className="h-4 w-4 mr-2" />
              Reporter
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations du Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Jean Dupont</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>15 Mars 2024</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>14:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes Médicales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={handleAddNote} className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Ajouter une note
                </Button>
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600">Aucune note pour le moment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentDetailsPage;