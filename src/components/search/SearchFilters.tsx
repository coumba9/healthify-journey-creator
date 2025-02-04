import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  insurance: string;
  setInsurance: (value: string) => void;
}

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  specialty,
  setSpecialty,
  location,
  setLocation,
  insurance,
  setInsurance,
}: SearchFiltersProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Rechercher un médecin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      
      <Select value={specialty} onValueChange={setSpecialty}>
        <SelectTrigger>
          <SelectValue placeholder="Spécialité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les spécialités</SelectItem>
          <SelectItem value="cardiologie">Cardiologie</SelectItem>
          <SelectItem value="pediatrie">Pédiatrie</SelectItem>
          <SelectItem value="generaliste">Médecine générale</SelectItem>
        </SelectContent>
      </Select>

      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger>
          <SelectValue placeholder="Localisation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les villes</SelectItem>
          <SelectItem value="Paris">Paris</SelectItem>
          <SelectItem value="Lyon">Lyon</SelectItem>
          <SelectItem value="Marseille">Marseille</SelectItem>
        </SelectContent>
      </Select>

      <Select value={insurance} onValueChange={setInsurance}>
        <SelectTrigger>
          <SelectValue placeholder="Mutuelle" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les mutuelles</SelectItem>
          <SelectItem value="MGEN">MGEN</SelectItem>
          <SelectItem value="Harmonie">Harmonie Mutuelle</SelectItem>
          <SelectItem value="MAAF">MAAF</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;