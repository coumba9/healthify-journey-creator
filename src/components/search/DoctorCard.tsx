
import { Star, Calendar, Euro, MapPin, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  price: number;
  insurance: string[];
  availability: string[];
  experience: number;
  availableTimes?: string[];
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: () => void;
}

const DoctorCard = ({ doctor, onBookAppointment }: DoctorCardProps) => {
  const navigate = useNavigate();

  // Formatter les dates de disponibilité pour un affichage plus convivial
  const formatAvailability = (dates: string[]) => {
    if (dates.length === 0) return "Aucune disponibilité";
    
    // Tri les dates par ordre chronologique
    const sortedDates = [...dates].sort();
    
    // Formatte les dates pour l'affichage
    return sortedDates.map(date => {
      const [year, month, day] = date.split('-');
      return `${day}/${month}`;
    }).join(', ');
  };

  const handleViewProfile = () => {
    navigate(`/doctor/${doctor.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{doctor.name}</CardTitle>
            <p className="text-sm text-primary">{doctor.specialty}</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span>{doctor.rating}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-2">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-sm">{doctor.location}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <Euro className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-sm">{doctor.price}€ la consultation</span>
          </div>
          
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-sm">
              {doctor.insurance.length > 0 
                ? doctor.insurance.slice(0, 2).join(', ') + (doctor.insurance.length > 2 ? '...' : '') 
                : 'Aucune mutuelle partenaire'}
            </span>
          </div>
          
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-sm">
              Disponible: {formatAvailability(doctor.availability)}
            </span>
          </div>
          
          {doctor.availableTimes && (
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {doctor.availableTimes.slice(0, 3).map((time, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {time}
                  </Badge>
                ))}
                {doctor.availableTimes.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{doctor.availableTimes.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleViewProfile}
        >
          Voir le profil
        </Button>
        <Button 
          className="flex-1"
          onClick={onBookAppointment}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Réserver
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
