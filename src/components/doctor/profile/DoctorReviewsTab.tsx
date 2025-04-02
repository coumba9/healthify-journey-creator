
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import DoctorReviewItem from "./DoctorReviewItem";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface DoctorReviewsTabProps {
  reviews: Review[];
  doctorName?: string;
  doctorSpecialty?: string;
}

const DoctorReviewsTab = ({ reviews, doctorName, doctorSpecialty }: DoctorReviewsTabProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBookAppointment = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour prendre un rendez-vous",
      });
      navigate('/login?redirect=/appointment');
    } else {
      navigate('/appointment', {
        state: {
          preselectedService: doctorSpecialty || "",
          preselectedDoctor: doctorName || ""
        }
      });
      toast({
        title: "Prise de rendez-vous",
        description: `Vous allez prendre rendez-vous avec ${doctorName || "le médecin"}`,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Bouton de prise de rendez-vous */}
      {doctorName && (
        <Button 
          className="w-full mb-4 bg-primary-600 hover:bg-primary-700" 
          onClick={handleBookAppointment}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Prendre rendez-vous avec {doctorName}
        </Button>
      )}
      
      {reviews.length === 0 ? (
        <p className="text-center py-4 text-gray-500">Aucun avis pour ce médecin.</p>
      ) : (
        reviews.map((review) => (
          <DoctorReviewItem 
            key={review.id}
            id={review.id}
            author={review.author}
            rating={review.rating}
            comment={review.comment}
            date={review.date}
          />
        ))
      )}
    </div>
  );
};

export default DoctorReviewsTab;
