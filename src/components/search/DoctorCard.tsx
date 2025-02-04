import { Star, Calendar, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {doctor.name}
          <span className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            {doctor.rating}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">Spécialité: {doctor.specialty}</p>
          <p className="text-sm">Expérience: {doctor.experience} ans</p>
          <p className="flex items-center gap-2">
            <Euro className="h-4 w-4" />
            {doctor.price}€ la consultation
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate(`/doctor/${doctor.id}`)}
            >
              Voir le profil
            </Button>
            <Button 
              className="w-full"
              onClick={() => navigate(`/appointment/new?doctorId=${doctor.id}`)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Réserver
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;