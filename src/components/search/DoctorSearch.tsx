
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SearchFilters from "./SearchFilters";
import DoctorCard from "./DoctorCard";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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
  image?: string;
}

const DoctorSearch = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [location, setLocation] = useState("all");
  const [insurance, setInsurance] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Exemple de données (à remplacer par des données réelles)
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Smith",
      specialty: "cardiologie",
      location: "Paris",
      rating: 4.8,
      price: 50,
      insurance: ["MGEN", "Harmonie Mutuelle"],
      availability: ["2024-03-25", "2024-03-26"],
      availableTimes: ["09:00", "10:00", "14:00", "15:00"],
      experience: 15,
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      id: "2",
      name: "Dr. Johnson",
      specialty: "pediatrie",
      location: "Lyon",
      rating: 4.5,
      price: 45,
      insurance: ["MAAF", "AXA"],
      availability: ["2024-03-24", "2024-03-27"],
      availableTimes: ["11:00", "13:30", "16:00"],
      experience: 10,
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: "3",
      name: "Dr. Dubois",
      specialty: "generaliste",
      location: "Paris",
      rating: 4.9,
      price: 35,
      insurance: ["MGEN", "MAAF", "AXA"],
      availability: ["2024-03-23", "2024-03-24", "2024-03-25"],
      availableTimes: ["08:30", "09:30", "10:30", "14:30", "15:30"],
      experience: 20,
      image: "https://randomuser.me/api/portraits/men/15.jpg"
    },
    {
      id: "4",
      name: "Dr. Leroy",
      specialty: "dermatologie",
      location: "Marseille",
      rating: 4.7,
      price: 55,
      insurance: ["Harmonie Mutuelle", "AXA"],
      availability: ["2024-03-22", "2024-03-25", "2024-03-26"],
      availableTimes: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      experience: 8,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simuler un délai de chargement (à remplacer par un appel API réel)
    setTimeout(() => {
      const filtered = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = specialty === "all" || doctor.specialty === specialty;
        const matchesLocation = location === "all" || doctor.location === location;
        const matchesInsurance = insurance === "all" || doctor.insurance.includes(insurance);
        
        return matchesSearch && matchesSpecialty && matchesLocation && matchesInsurance;
      });

      setFilteredDoctors(filtered);
      setHasSearched(true);
      setIsLoading(false);
      
      toast({
        title: "Recherche effectuée",
        description: `${filtered.length} médecins trouvés`,
      });
    }, 1000);
  };

  const handleBookAppointment = (doctorId: string) => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      // avec un paramètre pour rediriger vers la page de prise de rendez-vous après connexion
      navigate(`/login?redirect=/dashboard/appointments`);
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour prendre un rendez-vous",
      });
    } else {
      // Si l'utilisateur est connecté, rediriger directement vers la page de prise de rendez-vous
      navigate(`/dashboard/appointments`);
      toast({
        title: "Page de rendez-vous",
        description: "Vous pouvez maintenant prendre rendez-vous",
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
            
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSpecialty("all");
              setLocation("all");
              setInsurance("all");
            }} className="mt-2">
              Réinitialiser les filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {hasSearched && (
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'médecin trouvé' : 'médecins trouvés'}
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                onBookAppointment={() => handleBookAppointment(doctor.id)}
              />
            ))}
          </div>

          {hasSearched && filteredDoctors.length === 0 && (
            <div className="text-center p-10 bg-white rounded-lg shadow">
              <p className="text-lg text-gray-600">Aucun médecin ne correspond à vos critères de recherche.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorSearch;
