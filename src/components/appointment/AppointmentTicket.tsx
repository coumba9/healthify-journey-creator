
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, Clock, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface AppointmentTicketProps {
  appointment: {
    id: string;
    date: string;
    time: string;
    doctorName: string;
    location?: string;
    speciality?: string;
  };
}

const AppointmentTicket = ({ appointment }: AppointmentTicketProps) => {
  const { toast } = useToast();
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    try {
      toast({
        title: "Préparation du ticket",
        description: "Veuillez patienter pendant la génération du PDF...",
      });

      // Capture du composant en tant qu'image
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // Meilleure qualité
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      // Création du PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      // Génération du nom de fichier avec la date et l'ID du rendez-vous
      const fileName = `ticket_rdv_${appointment.id}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Téléchargement du PDF
      pdf.save(fileName);

      toast({
        title: "Ticket téléchargé",
        description: "Le ticket a été téléchargé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement du ticket:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement du ticket.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow">
      <div ref={ticketRef}>
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
              {appointment.speciality && (
                <span className="text-sm text-gray-500">({appointment.speciality})</span>
              )}
            </div>
            {appointment.location && (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-5 w-5 text-primary-600" />
                <span>{appointment.location}</span>
              </div>
            )}
          </div>
        </CardContent>
      </div>
      <CardContent className="pt-0">
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
