
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SearchFilters from "./SearchFilters";
import DoctorCard from "./DoctorCard";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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
  availableTimes?: string[];
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
      experience: 15
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
      experience: 10
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
      experience: 20
    }
  ];

  const handleSearch = () => {
    const filteredDoctors = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = specialty === "all" || doctor.specialty === specialty;
      const matchesLocation = location === "all" || doctor.location === location;
      const matchesInsurance = insurance === "all" || doctor.insurance.includes(insurance);
      
      return matchesSearch && matchesSpecialty && matchesLocation && matchesInsurance;
    });

    console.log("Doctors trouvés:", filteredDoctors);
    toast({
      title: "Recherche effectuée",
      description: `${filteredDoctors.length} médecins trouvés`,
    });
  };

  const handleBookAppointment = (doctorId: string) => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      // avec un paramètre pour rediriger vers la page de prise de rendez-vous après connexion
      navigate(`/login?redirect=/appointment/new?doctorId=${doctorId}`);
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour prendre un rendez-vous",
      });
    } else {
      // Si l'utilisateur est connecté, rediriger directement vers la page de prise de rendez-vous
      navigate(`/appointment/new?doctorId=${doctorId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Trouvez le médecin idéal</h2>
          <p className="text-gray-600 mb-4">
            Recherchez parmi notre réseau de professionnels de santé qualifiés et prenez rendez-vous en quelques clics.
          </p>
          
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
            <Button onClick={handleSearch} className="mt-2">
              Rechercher
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
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onBookAppointment={() => handleBookAppointment(doctor.id)}
            />
          ))}
        </div>

        {doctors.length === 0 && (
          <div className="text-center p-10 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-600">Aucun médecin ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;
