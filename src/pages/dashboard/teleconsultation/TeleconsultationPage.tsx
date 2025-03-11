
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import VideoConsultation from "@/components/teleconsultation/VideoConsultation";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, FileText, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const TeleconsultationPage = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDoctor, setIsDoctor] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dans une implémentation réelle, nous récupérerions les détails du rendez-vous depuis l'API
    // Ici, nous simulons des données
    const fetchAppointmentData = async () => {
      setIsLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Vérifier si l'utilisateur est un médecin ou un patient
        const userRole = user?.role || 'patient';
        setIsDoctor(userRole === 'doctor');
        
        // Données simulées pour le rendez-vous
        const mockAppointmentData = {
          id: appointmentId,
          doctorId: "doctor-123",
          doctorName: "Dr. Martin Dupont",
          patientId: "patient-456",
          patientName: "Sophie Lefebvre",
          date: new Date(),
          type: "Téléconsultation",
          status: "confirmed",
          reason: "Suivi médical",
          notes: "Patient souffrant de migraines chroniques"
        };
        
        setAppointmentData(mockAppointmentData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du rendez-vous.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointmentData();
    }
  }, [appointmentId, user, toast]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-pulse text-lg">Chargement de la téléconsultation...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!appointmentData) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Rendez-vous non trouvé</h2>
          <p className="mb-6">Le rendez-vous demandé n'existe pas ou a été annulé.</p>
          <Button onClick={() => navigate("/dashboard/appointments")}>
            Retour aux rendez-vous
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard/appointments")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold">Téléconsultation</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <VideoConsultation
              appointmentId={appointmentData.id}
              doctorName={appointmentData.doctorName}
              patientName={appointmentData.patientName}
              isDoctor={isDoctor}
            />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations du rendez-vous</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Date et heure</p>
                    <p className="text-sm text-gray-500">
                      {appointmentData.date.toLocaleDateString()} à{" "}
                      {appointmentData.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {isDoctor ? "Patient" : "Médecin"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isDoctor ? appointmentData.patientName : appointmentData.doctorName}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Motif</p>
                    <p className="text-sm text-gray-500">
                      {appointmentData.reason}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conseils pour la téléconsultation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Assurez-vous d'être dans un endroit calme et bien éclairé</li>
                  <li>• Vérifiez que votre connexion internet est stable</li>
                  <li>• Préparez vos questions et documents médicaux à l'avance</li>
                  <li>• Ayez vos médicaments à portée de main pour les montrer si nécessaire</li>
                  <li>• En cas de problème technique, rafraîchissez la page ou reconnectez-vous</li>
                </ul>
              </CardContent>
            </Card>

            {isDoctor && (
              <Card>
                <CardHeader>
                  <CardTitle>Actions médicales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => toast({
                      title: "Fonctionnalité en développement",
                      description: "Cette fonctionnalité sera disponible prochainement."
                    })}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Créer une ordonnance
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => toast({
                      title: "Fonctionnalité en développement",
                      description: "Cette fonctionnalité sera disponible prochainement."
                    })}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Programmer un suivi
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeleconsultationPage;
