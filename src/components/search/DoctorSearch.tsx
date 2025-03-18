
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SearchFilters from "./SearchFilters";
import DoctorList from "./DoctorList";
import { useSearchDoctors } from "./useSearchDoctors";
import { Doctor } from "./types";
import { useToast } from "@/hooks/use-toast";

const DoctorSearch = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    specialty,
    setSpecialty,
    location,
    setLocation,
    insurance,
    setInsurance,
    isLoading,
    filteredDoctors,
    hasSearched,
    handleSearch,
    resetFilters
  } = useSearchDoctors();

  const handleBookAppointment = (doctor: Doctor) => {
    if (!user) {
      navigate('/login?redirect=/appointment');
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour prendre un rendez-vous",
      });
    } else {
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
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Trouvez le médecin idéal</h2>
          
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            specialty={specialty}
            setSpecialty={setSpecialty}
            location={location}
            setLocation={setLocation}
            insurance={insurance}
            setInsurance={setInsurance}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleSearch} disabled={isLoading} className="mt-2">
              {isLoading ? "Recherche en cours..." : "Rechercher"}
            </Button>
            
            <Button variant="outline" onClick={resetFilters} className="mt-2">
              Réinitialiser les filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      <DoctorList 
        doctors={filteredDoctors}
        isLoading={isLoading}
        hasSearched={hasSearched}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default DoctorSearch;
