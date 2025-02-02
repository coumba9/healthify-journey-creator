import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MapPin, Star, UserSearch } from "lucide-react";
import DoctorProfile from "@/components/professionals/DoctorProfile";
import { Badge } from "@/components/ui/badge";
import debounce from "lodash/debounce";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  languages: string[];
  experience: number;
  price: number;
  availability: string[];
}

const SearchProfessionals = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  // Exemple de données (à remplacer par des données réelles de l'API)
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sophie Martin",
      specialty: "Cardiologie",
      location: "Paris",
      rating: 4.8,
      languages: ["Français", "Anglais"],
      experience: 15,
      price: 80,
      availability: ["Lundi", "Mercredi", "Vendredi"],
    },
    {
      id: "2",
      name: "Dr. Jean Dupont",
      specialty: "Pédiatrie",
      location: "Lyon",
      rating: 4.5,
      languages: ["Français", "Espagnol"],
      experience: 10,
      price: 70,
      availability: ["Mardi", "Jeudi"],
    },
  ];

  const filterDoctors = useCallback(
    debounce((searchValue: string) => {
      setIsLoading(true);
      const filtered = doctors.filter((doctor) => {
        const matchesSearch =
          !searchValue ||
          doctor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchValue.toLowerCase());

        const matchesSpecialty =
          selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;

        const matchesLocation =
          selectedLocation === "all" || doctor.location === selectedLocation;

        const matchesPrice =
          doctor.price >= priceRange[0] && doctor.price <= priceRange[1];

        const matchesRating = doctor.rating >= minRating;

        const matchesLanguages =
          selectedLanguages.length === 0 ||
          selectedLanguages.every((lang) => doctor.languages.includes(lang));

        return (
          matchesSearch &&
          matchesSpecialty &&
          matchesLocation &&
          matchesPrice &&
          matchesRating &&
          matchesLanguages
        );
      });

      setFilteredDoctors(filtered);
      setIsLoading(false);
    }, 300),
    [selectedSpecialty, selectedLocation, priceRange, minRating, selectedLanguages]
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterDoctors(value);
    
    toast({
      title: "Recherche en cours",
      description: "Filtrage des professionnels selon vos critères...",
    });
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <UserSearch className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Recherche de Professionnels</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <Input
                placeholder="Nom ou spécialité..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Spécialité</label>
              <Select
                value={selectedSpecialty}
                onValueChange={(value) => {
                  setSelectedSpecialty(value);
                  filterDoctors(searchTerm);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une spécialité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les spécialités</SelectItem>
                  <SelectItem value="cardiologie">Cardiologie</SelectItem>
                  <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                  <SelectItem value="dermatologie">Dermatologie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Localisation</label>
              <Select
                value={selectedLocation}
                onValueChange={(value) => {
                  setSelectedLocation(value);
                  filterDoctors(searchTerm);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  <SelectItem value="paris">Paris</SelectItem>
                  <SelectItem value="lyon">Lyon</SelectItem>
                  <SelectItem value="marseille">Marseille</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tarif (€)</label>
              <Slider
                defaultValue={[0, 200]}
                max={200}
                step={10}
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value);
                  filterDoctors(searchTerm);
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{priceRange[0]}€</span>
                <span>{priceRange[1]}€</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Langues parlées</label>
              <div className="flex flex-wrap gap-2">
                {["Français", "Anglais", "Espagnol", "Allemand"].map(
                  (language) => (
                    <Badge
                      key={language}
                      variant={
                        selectedLanguages.includes(language)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => {
                        handleLanguageToggle(language);
                        filterDoctors(searchTerm);
                      }}
                    >
                      {language}
                    </Badge>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Note minimum</label>
              <div className="flex items-center gap-2">
                <Slider
                  defaultValue={[0]}
                  max={5}
                  step={0.5}
                  value={[minRating]}
                  onValueChange={(value) => {
                    setMinRating(value[0]);
                    filterDoctors(searchTerm);
                  }}
                />
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {minRating}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-4">
          {isLoading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorProfile key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center py-8">
              Aucun professionnel ne correspond à vos critères
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProfessionals;
