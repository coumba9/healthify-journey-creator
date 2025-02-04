import { Calendar, MapPin, Star, Clock, Euro, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DoctorProfileProps {
  doctorId: string;
}

const DoctorProfile = ({ doctorId }: DoctorProfileProps) => {
  // Exemple de données (à remplacer par des données réelles)
  const doctor = {
    id: doctorId,
    name: "Dr. Smith",
    specialty: "Cardiologie",
    location: "123 Rue de la Santé, Paris",
    rating: 4.8,
    price: 50,
    insurance: ["MGEN", "Harmonie Mutuelle"],
    experience: 15,
    education: [
      "Faculté de Médecine de Paris",
      "Spécialisation en Cardiologie",
    ],
    languages: ["Français", "Anglais"],
    reviews: [
      {
        id: "1",
        author: "Jean D.",
        rating: 5,
        comment: "Excellent médecin, très à l'écoute",
        date: "2024-03-15"
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{doctor.name}</CardTitle>
              <CardDescription className="text-lg">{doctor.specialty}</CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-bold">{doctor.rating}</span>
              </div>
              <p className="text-sm text-gray-500">{doctor.reviews.length} avis</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="schedule">Horaires</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-gray-400" />
                  <span>{doctor.price}€ la consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gray-400" />
                  <span>{doctor.experience} ans d'expérience</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Formation</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {doctor.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Langues parlées</h3>
                  <div className="flex gap-2">
                    {doctor.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Mutuelles partenaires</h3>
                  <div className="flex gap-2">
                    {doctor.insurance.map((ins, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {ins}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <div className="space-y-4">
                <div className="grid gap-4">
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre rendez-vous
                  </Button>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Horaires d'ouverture</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Lundi - Vendredi</span>
                      </div>
                      <span>9:00 - 18:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {doctor.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1">{review.rating}</span>
                        </div>
                      </div>
                      <p className="mt-2">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;