import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SearchFilters from "./SearchFilters";
import DoctorCard from "./DoctorCard";

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

const DoctorSearch = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [location, setLocation] = useState("all");
  const [insurance, setInsurance] = useState("all");

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
      experience: 10
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-6">
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

        <Button onClick={handleSearch} className="w-full md:w-auto">
          Rechercher
        </Button>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;