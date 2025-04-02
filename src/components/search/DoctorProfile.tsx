
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorProfileHeader from "../doctor/profile/DoctorProfileHeader";
import DoctorInfoTab from "../doctor/profile/DoctorInfoTab";
import DoctorScheduleTab from "../doctor/profile/DoctorScheduleTab";
import DoctorReviewsTab from "../doctor/profile/DoctorReviewsTab";
import { useDoctorProfileData } from "../doctor/profile/useDoctorProfileData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface DoctorProfileProps {
  doctorId: string;
}

const DoctorProfile = ({ doctorId }: DoctorProfileProps) => {
  const { doctor, isLoading, error } = useDoctorProfileData(doctorId);
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAppointment = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour prendre un rendez-vous",
      });
      navigate('/login?redirect=/appointment');
    } else {
      if (doctor) {
        navigate('/appointment', {
          state: {
            preselectedService: doctor.specialty,
            preselectedDoctor: doctor.name
          }
        });
        toast({
          title: "Prise de rendez-vous",
          description: `Vous allez prendre rendez-vous avec ${doctor.name}`,
        });
      }
    }
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-64">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>;
  }

  if (error || !doctor) {
    return <div className="max-w-4xl mx-auto p-6 text-center">
      <p className="text-red-500 mb-4">Erreur: {error || "Médecin non trouvé"}</p>
      <Button variant="outline" onClick={() => navigate(-1)}>Retour</Button>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="pb-0">
          <DoctorProfileHeader 
            name={doctor.name}
            specialty={doctor.specialty}
            rating={doctor.rating}
            reviewCount={doctor.reviews.length}
          />
          <Button 
            className="w-full mt-4 bg-primary-600 hover:bg-primary-700" 
            onClick={handleAppointment}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Prendre rendez-vous
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="schedule">Horaires</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 mt-4">
              <DoctorInfoTab 
                location={doctor.location}
                price={doctor.price}
                experience={doctor.experience}
                education={doctor.education}
                languages={doctor.languages}
                insurance={doctor.insurance}
              />
            </TabsContent>

            <TabsContent value="schedule" className="mt-4">
              <DoctorScheduleTab 
                onBookAppointment={handleAppointment}
                schedules={doctor.schedules}
              />
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <DoctorReviewsTab 
                reviews={doctor.reviews}
                doctorName={doctor.name}
                doctorSpecialty={doctor.specialty}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
