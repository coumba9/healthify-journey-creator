
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

interface DoctorProfileProps {
  doctorId: string;
}

const DoctorProfile = ({ doctorId }: DoctorProfileProps) => {
  const { doctor, isLoading, error, handleBookAppointment } = useDoctorProfileData(doctorId);
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
    return <div className="max-w-4xl mx-auto p-6">Chargement...</div>;
  }

  if (error || !doctor) {
    return <div className="max-w-4xl mx-auto p-6">Erreur: {error || "Médecin non trouvé"}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <DoctorProfileHeader 
            name={doctor.name}
            specialty={doctor.specialty}
            rating={doctor.rating}
            reviewCount={doctor.reviews.length}
          />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="schedule">Horaires</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <DoctorInfoTab 
                location={doctor.location}
                price={doctor.price}
                experience={doctor.experience}
                education={doctor.education}
                languages={doctor.languages}
                insurance={doctor.insurance}
              />
            </TabsContent>

            <TabsContent value="schedule">
              <DoctorScheduleTab 
                onBookAppointment={handleAppointment}
                schedules={doctor.schedules}
              />
            </TabsContent>

            <TabsContent value="reviews">
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
