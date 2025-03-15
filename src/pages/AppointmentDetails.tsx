
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, MapPin, AlertCircle, FileText, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Simuler un rendez-vous pour la démo
const mockAppointment = {
  id: "123456",
  date: "2023-06-15",
  time: "14:30",
  service: "cardiologie",
  doctor: "Dr. Sophie Martin",
  consultationType: "cabinet",
  status: "confirmé",
  location: "Cabinet Médical Central, 123 Rue de la Santé",
  notes: "Apportez vos derniers résultats d'analyses sanguines.",
  documents: [
    { id: "doc1", name: "Ordonnance.pdf", type: "pdf" },
    { id: "doc2", name: "Résultats d'analyse.pdf", type: "pdf" }
  ]
};

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Normalement, on ferait un appel API ici pour récupérer les détails du rendez-vous
    // Pour la démo, on utilise un mock
    setAppointment(mockAppointment);
    setLoading(false);
    
    toast({
      title: "Détails du rendez-vous",
      description: "Voici les informations concernant votre rendez-vous",
    });
  }, [id, toast]);

  const handleCancelAppointment = () => {
    toast({
      title: "Rendez-vous annulé",
      description: "Votre rendez-vous a été annulé avec succès",
      variant: "default",
    });
    navigate('/dashboard/appointments');
  };

  const handleReschedule = () => {
    navigate('/appointment', { 
      state: { 
        preselectedService: appointment.service,
        isRescheduling: true,
        originalAppointmentId: id
      } 
    });
  };

  const handleJoinTeleconsultation = () => {
    navigate('/teleconsultation', { state: { appointmentId: id } });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rendez-vous introuvable</h1>
          <p className="text-lg text-gray-600 mb-8">
            Ce rendez-vous n'existe pas ou a été annulé.
          </p>
          <Button onClick={() => navigate('/dashboard/appointments')}>
            Retour à mes rendez-vous
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = appointment.date ? 
    format(new Date(appointment.date), "EEEE d MMMM yyyy", { locale: fr }) : 
    "Date non spécifiée";

  const isTeleconsultation = appointment.consultationType === "teleconsultation";
  const isUpcoming = new Date(`${appointment.date}T${appointment.time}`) > new Date();
  const isWithin30Min = new Date(`${appointment.date}T${appointment.time}`) <= new Date(Date.now() + 30 * 60 * 1000);
  const canJoinTeleconsultation = isTeleconsultation && isUpcoming && isWithin30Min;
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/appointments')}
            className="mb-4"
          >
            &larr; Retour à mes rendez-vous
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Détails du rendez-vous</h1>
          <p className="text-lg text-gray-600">
            Référence : {appointment.id}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Informations</CardTitle>
              <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                {appointment.status}
              </div>
            </div>
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
                <div className="text-gray-600">{appointment.time}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Médecin</div>
                <div className="text-gray-600">{appointment.doctor}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Type de consultation</div>
                <div className="text-gray-600">
                  {appointment.consultationType === "cabinet" ? (
                    <>En cabinet - {appointment.location}</>
                  ) : (
                    <>Téléconsultation</>
                  )}
                </div>
              </div>
            </div>
            
            {appointment.notes && (
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Notes</div>
                  <div className="text-gray-600">{appointment.notes}</div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t pt-6">
            {canJoinTeleconsultation && (
              <Button 
                className="w-full"
                onClick={handleJoinTeleconsultation}
              >
                <Video className="mr-2 h-4 w-4" />
                Rejoindre la téléconsultation
              </Button>
            )}
            
            <div className="flex gap-4 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleReschedule}
              >
                Reprogrammer
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Annuler le rendez-vous</DialogTitle>
                  </DialogHeader>
                  <p className="py-4">
                    Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action est irréversible.
                  </p>
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => {}}>Retour</Button>
                    <Button variant="destructive" onClick={handleCancelAppointment}>Confirmer</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
        
        {appointment.documents && appointment.documents.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Documents associés</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {appointment.documents.map(doc => (
                  <li key={doc.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <span>{doc.name}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
