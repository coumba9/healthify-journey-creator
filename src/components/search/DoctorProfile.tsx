
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

interface DoctorProfileProps {
  doctorId: string;
}

const DoctorProfile = ({ doctorId }: DoctorProfileProps) => {
  const { doctor, isLoading, error, handleBookAppointment } = useDoctorProfileData(doctorId);
  const [activeTab, setActiveTab] = useState("info");

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
                onBookAppointment={handleBookAppointment}
                schedules={doctor.schedules}
              />
            </TabsContent>

            <TabsContent value="reviews">
              <DoctorReviewsTab reviews={doctor.reviews} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
