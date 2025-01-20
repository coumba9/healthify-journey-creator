import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, Clock, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentTicketProps {
  appointment: {
    id: string;
    date: string;
    time: string;
    doctorName: string;
    location: string;
    speciality: string;
  };
}

const AppointmentTicket = ({ appointment }: AppointmentTicketProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    // Simulation du téléchargement
    toast({
      title: "Ticket téléchargé",
      description: "Le ticket a été téléchargé avec succès.",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow">
      <CardHeader className="bg-primary-100 rounded-t-lg">
        <CardTitle className="text-xl font-bold text-primary-800">
          Ticket de rendez-vous
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-5 w-5 text-primary-600" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="h-5 w-5 text-primary-600" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <User className="h-5 w-5 text-primary-600" />
            <span>Dr. {appointment.doctorName}</span>
            <span className="text-sm text-gray-500">({appointment.speciality})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="h-5 w-5 text-primary-600" />
            <span>{appointment.location}</span>
          </div>
        </div>
        <Button 
          onClick={handleDownload}
          className="w-full mt-4 gap-2"
        >
          <Download className="h-4 w-4" />
          Télécharger le ticket
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentTicket;