import { useState } from "react";
import { Search, MapPin, Star, Calendar, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
  const [availability, setAvailability] = useState("all");

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
    // Logique de filtrage
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Input
              placeholder="Rechercher un médecin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={<Search className="h-4 w-4" />}
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

        <Button onClick={handleSearch} className="w-full md:w-auto">
          Rechercher
        </Button>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {doctor.name}
                  <span className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {doctor.rating}
                  </span>
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {doctor.location}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Spécialité: {doctor.specialty}</p>
                  <p className="text-sm">Expérience: {doctor.experience} ans</p>
                  <p className="flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    {doctor.price}€ la consultation
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      Voir le profil
                    </Button>
                    <Button className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Réserver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;