import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DoctorProfileProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    location: string;
    rating: number;
    languages: string[];
    experience: number;
    price: number;
    availability: string[];
  };
}

const DoctorProfile = ({ doctor }: DoctorProfileProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{doctor.name}</CardTitle>
            <p className="text-primary">{doctor.specialty}</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            {doctor.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              {doctor.location}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Languages className="h-4 w-4" />
              {doctor.languages.join(", ")}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              {doctor.experience} ans d'expérience
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold">{doctor.price}€ / consultation</p>
            <div className="flex flex-wrap gap-2">
              {doctor.availability.map((day) => (
                <Badge key={day} variant="outline">
                  {day}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            className="flex-1"
            onClick={() => navigate(`/appointment/${doctor.id}`)}
          >
            Prendre rendez-vous
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(`/doctor/${doctor.id}`)}
          >
            Voir le profil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorProfile;