
import { useState } from "react";
import { Doctor } from "./types";
import { doctors } from "./mockData";
import { useToast } from "@/hooks/use-toast";

export const useSearchDoctors = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [location, setLocation] = useState("all");
  const [insurance, setInsurance] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    
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

  const resetFilters = () => {
    setSearchTerm("");
    setSpecialty("all");
    setLocation("all");
    setInsurance("all");
  };

  return {
    searchTerm,
    setSearchTerm,
    specialty,
    setSpecialty,
    location,
    setLocation,
    insurance,
    setInsurance,
    availabilityFilter,
    setAvailabilityFilter,
    isLoading,
    filteredDoctors,
    hasSearched,
    handleSearch,
    resetFilters
  };
};
