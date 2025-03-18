
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Award, Clock, FileText, Star, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const DoctorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Ces données devraient idéalement venir d'une API
  const doctor = {
    id: id,
    name: id === "1" ? "Dr. Smith" : id === "2" ? "Dr. Johnson" : id === "3" ? "Dr. Dubois" : "Dr. Leroy",
    specialty: id === "1" ? "Cardiologie" : id === "2" ? "Pédiatrie" : id === "3" ? "Médecine générale" : "Dermatologie",
    rating: id === "1" ? 4.8 : id === "2" ? 4.5 : id === "3" ? 4.9 : 4.7,
    location: id === "1" || id === "3" ? "Paris" : id === "2" ? "Lyon" : "Marseille",
    price: id === "1" ? 50 : id === "2" ? 45 : id === "3" ? 35 : 55,
    insurance: id === "1" ? ["MGEN", "Harmonie Mutuelle"] : 
               id === "2" ? ["MAAF", "AXA"] : 
               id === "3" ? ["MGEN", "MAAF", "AXA"] : 
               ["Harmonie Mutuelle", "AXA"],
    availability: id === "1" ? ["2024-03-25", "2024-03-26"] : 
                  id === "2" ? ["2024-03-24", "2024-03-27"] : 
                  id === "3" ? ["2024-03-23", "2024-03-24", "2024-03-25"] : 
                  ["2024-03-22", "2024-03-25", "2024-03-26"],
    availableTimes: id === "1" ? ["09:00", "10:00", "14:00", "15:00"] : 
                   id === "2" ? ["11:00", "13:30", "16:00"] : 
                   id === "3" ? ["08:30", "09:30", "10:30", "14:30", "15:30"] : 
                   ["10:00", "11:00", "14:00", "15:00", "16:00"],
    experience: id === "1" ? 15 : id === "2" ? 10 : id === "3" ? 20 : 8,
    education: ["Université de Médecine de Paris", "Formation spécialisée en Europe"],
    languages: ["Français", "Anglais"],
    about: "Médecin expérimenté avec une approche centrée sur le patient. Spécialisé dans le diagnostic et le traitement des pathologies complexes."
  };

  const handleBookAppointment = () => {
    if (!user) {
      navigate('/login?redirect=/appointment');
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour prendre un rendez-vous",
      });
    } else {
      // Redirect to appointment page with doctor info
      navigate('/appointment', {
        state: {
          preselectedService: doctor.specialty.toLowerCase(),
          preselectedDoctor: doctor.name
        }
      });
      toast({
        title: "Prise de rendez-vous",
        description: `Vous allez prendre rendez-vous avec ${doctor.name}`,
      });
    }
  };

  const formatAvailability = (dates: string[]) => {
    if (dates.length === 0) return "Aucune disponibilité";
    
    const sortedDates = [...dates].sort();
    
    return sortedDates.map(date => {
      const [year, month, day] = date.split('-');
      return `${day}/${month}`;
    }).join(', ');
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1>Médecin non trouvé</h1>
          <Button onClick={() => navigate('/doctors')}>Retour</Button>
        </div>
      </div>
    );
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
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">{doctor.name}</CardTitle>
                    <CardDescription className="text-primary text-lg">{doctor.specialty}</CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span>{doctor.rating}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">À propos</h3>
                    <p className="text-gray-700">{doctor.about}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                      <span>{doctor.location}</span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Award className="h-5 w-5 text-primary-600 mt-0.5" />
                      <span>{doctor.experience} ans d'expérience</span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary-600 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-medium">Formation</span>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {doctor.education.map((edu, index) => (
                            <li key={index}>{edu}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary-600 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-medium">Mutuelles acceptées</span>
                        <span className="text-sm text-gray-600">
                          {doctor.insurance.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Prochaines disponibilités</h3>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-primary-600 mt-0.5" />
                    <span>{formatAvailability(doctor.availability)}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div className="flex flex-wrap gap-2">
                      {doctor.availableTimes.map((time, index) => (
                        <Badge key={index} variant="secondary">{time}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne de droite - Actions et prix */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Consultation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{doctor.price}€</p>
                  <p className="text-sm text-gray-500">par consultation</p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleBookAppointment}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Prendre rendez-vous
                </Button>
                
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium mb-2">Langues parlées</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang, index) => (
                      <Badge key={index} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
