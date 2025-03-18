
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useDoctorProfile } from "@/hooks/useDoctorProfile";
import DoctorInfoCard from "@/components/doctor/DoctorInfoCard";
import ConsultationCard from "@/components/doctor/ConsultationCard";
import DoctorNotFound from "@/components/doctor/DoctorNotFound";

const DoctorProfilePage = () => {
  const navigate = useNavigate();
  const { doctor, formatAvailability } = useDoctorProfile();

  if (!doctor) {
    return <DoctorNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>{doctor.name} | MediConnect</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux résultats
        </Button>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Colonne de gauche - Informations du médecin */}
          <div className="md:col-span-2">
            <DoctorInfoCard 
              doctor={doctor}
              formatAvailability={formatAvailability}
            />
          </div>

          {/* Colonne de droite - Actions et prix */}
          <div>
            <ConsultationCard doctor={doctor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
