
import { Helmet } from "react-helmet";
import DoctorSearch from "@/components/search/DoctorSearch";
import { BackButton } from "@/components/ui/back-button";

const DoctorsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Trouver un médecin | MediConnect</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-2">Trouver un médecin</h1>
        <p className="text-gray-600 mb-8">Recherchez parmi nos médecins qualifiés et prenez rendez-vous en quelques clics</p>
        <DoctorSearch />
      </div>
    </div>
  );
};

export default DoctorsPage;
