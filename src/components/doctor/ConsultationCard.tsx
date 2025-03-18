
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorProfileData } from "@/hooks/useDoctorProfile";

interface ConsultationCardProps {
  doctor: DoctorProfileData;
}

const ConsultationCard = ({ doctor }: ConsultationCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleBookAppointment = () => {
    if (!user) {
      navigate('/login?redirect=/appointment');
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour prendre un rendez-vous",
      });
    } else {
      // Redirect to appointment page with doctor info
      navigate('/appointment', {
        state: {
          preselectedService: doctor.specialty.toLowerCase(),
          preselectedDoctor: doctor.name
        }
      });
      toast({
        title: "Prise de rendez-vous",
        description: `Vous allez prendre rendez-vous avec ${doctor.name}`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Consultation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{doctor.price}€</p>
          <p className="text-sm text-gray-500">par consultation</p>
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleBookAppointment}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Prendre rendez-vous
        </Button>
        
        <div className="text-sm text-gray-600">
          <h4 className="font-medium mb-2">Langues parlées</h4>
          <div className="flex flex-wrap gap-2">
            {doctor.languages.map((lang, index) => (
              <Badge key={index} variant="outline">{lang}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationCard;
