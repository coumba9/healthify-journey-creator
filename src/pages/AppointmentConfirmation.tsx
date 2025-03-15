
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, Clock, User, MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const appointmentData = location.state?.appointmentData;

  useEffect(() => {
    if (!appointmentData) {
      navigate('/appointment');
      return;
    }

    toast({
      title: "Rendez-vous confirmé",
      description: "Votre rendez-vous a été enregistré avec succès",
      variant: "default",
    });
  }, [appointmentData, navigate, toast]);

  if (!appointmentData) {
    return null;
  }

  const formattedDate = appointmentData.date ? 
    format(new Date(appointmentData.date), "EEEE d MMMM yyyy", { locale: fr }) : 
    "Date non spécifiée";

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rendez-vous confirmé</h1>
          <p className="text-lg text-gray-600">
            Un e-mail de confirmation a été envoyé à votre adresse
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Détails du rendez-vous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Date</div>
                <div className="text-gray-600">{formattedDate}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Heure</div>
                <div className="text-gray-600">{appointmentData.time || "Heure non spécifiée"}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Service</div>
                <div className="text-gray-600">
                  {appointmentData.service === "generaliste" ? "Médecine générale" : 
                   appointmentData.service === "cardiologie" ? "Cardiologie" :
                   appointmentData.service === "pediatrie" ? "Pédiatrie" :
                   appointmentData.service === "dermatologie" ? "Dermatologie" :
                   appointmentData.service === "ophtalmologie" ? "Ophtalmologie" :
                   appointmentData.service || "Service non spécifié"}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Type de consultation</div>
                <div className="text-gray-600">
                  {appointmentData.consultationType === "cabinet" ? "En cabinet" : 
                   appointmentData.consultationType === "teleconsultation" ? "Téléconsultation" :
                   appointmentData.consultationType || "Type non spécifié"}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t pt-6">
            <div className="text-sm text-gray-500 text-center">
              Vous recevrez un rappel 24 heures avant votre rendez-vous
            </div>
          </CardFooter>
        </Card>

        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <h3 className="font-medium text-blue-900 mb-2">Informations importantes</h3>
          <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
            <li>Veuillez arriver 15 minutes avant l'heure de votre rendez-vous</li>
            <li>Apportez votre carte d'identité et votre carte d'assurance maladie</li>
            <li>En cas d'empêchement, veuillez annuler votre rendez-vous au moins 24 heures à l'avance</li>
            {appointmentData.consultationType === "teleconsultation" && (
              <li>Assurez-vous d'avoir une connexion internet stable et un appareil avec caméra et microphone</li>
            )}
          </ul>
        </div>

        <div className="text-center space-y-4">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="mr-4"
          >
            Retour à l'accueil
          </Button>
          <Button 
            onClick={() => navigate('/appointment')}
          >
            Prendre un autre rendez-vous
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
