
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PatientSection from "@/components/services/PatientSection";
import DoctorSection from "@/components/services/DoctorSection";
import AdminSection from "@/components/services/AdminSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  Heart, 
  Brain, 
  Stethoscope, 
  Syringe, 
  ChevronRight, 
  Clock, 
  Euro,
  Monitor,
  User,
  CalendarClock
} from "lucide-react";

interface Service {
  id: number;
  name: string;
  icon: any;
  description: string;
  price: string;
  duration: string;
  popular?: boolean;
  forChildren?: boolean;
  forAdults?: boolean;
  forElderly?: boolean;
  teleconsultation?: boolean;
}

const ServicesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const allServices: Service[] = [
    {
      id: 1,
      name: "Cardiologie",
      icon: Heart,
      description: "Soins cardiaques spécialisés et prévention des maladies cardiaques.",
      price: "150",
      duration: "45",
      popular: true,
      forAdults: true,
      forElderly: true
    },
    {
      id: 2,
      name: "Neurologie",
      icon: Brain,
      description: "Diagnostic et traitement des troubles du système nerveux.",
      price: "180",
      duration: "60",
      forAdults: true,
      forElderly: true
    },
    {
      id: 3,
      name: "Médecine générale",
      icon: Stethoscope,
      description: "Soins de santé primaires et préventifs pour toute la famille.",
      price: "70",
      duration: "30",
      popular: true,
      forChildren: true,
      forAdults: true,
      forElderly: true,
      teleconsultation: true
    },
    {
      id: 4,
      name: "Urgences",
      icon: Syringe,
      description: "Service d'urgence disponible 24/7 pour tous types de situations.",
      price: "100",
      duration: "Variable",
      forChildren: true,
      forAdults: true,
      forElderly: true
    },
    {
      id: 5,
      name: "Téléconsultation",
      icon: Monitor,
      description: "Consultations médicales à distance pour plus de flexibilité.",
      price: "60",
      duration: "20",
      popular: true,
      forChildren: true,
      forAdults: true,
      forElderly: true,
      teleconsultation: true
    },
    {
      id: 6,
      name: "Pédiatrie",
      icon: User,
      description: "Soins médicaux spécialisés pour les enfants et les adolescents.",
      price: "90",
      duration: "40",
      forChildren: true,
      teleconsultation: true
    },
    {
      id: 7,
      name: "Dermatologie",
      icon: User,
      description: "Traitement des affections de la peau, des cheveux et des ongles.",
      price: "120",
      duration: "30",
      forChildren: true,
      forAdults: true,
      forElderly: true,
      teleconsultation: true
    },
    {
      id: 8,
      name: "Suivi médical",
      icon: CalendarClock,
      description: "Suivi régulier pour les patients atteints de maladies chroniques.",
      price: "80",
      duration: "30",
      forAdults: true,
      forElderly: true,
      teleconsultation: true
    },
  ];

  const [filteredServices, setFilteredServices] = useState(allServices);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredServices(allServices);
    } else if (activeTab === "teleconsultation") {
      setFilteredServices(allServices.filter(service => service.teleconsultation));
    } else if (activeTab === "children") {
      setFilteredServices(allServices.filter(service => service.forChildren));
    } else if (activeTab === "adults") {
      setFilteredServices(allServices.filter(service => service.forAdults));
    } else if (activeTab === "elderly") {
      setFilteredServices(allServices.filter(service => service.forElderly));
    }
  }, [activeTab]);

  const handleBookAppointment = (service: Service) => {
    navigate("/appointment", { state: { preselectedService: service.name.toLowerCase() } });
  };

  const renderUserContent = () => {
    switch (user?.role) {
      case "patient":
        return <PatientSection />;
      case "doctor":
        return <DoctorSection />;
      case "admin":
        return <AdminSection />;
      default:
        return (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Créez un compte pour accéder à des fonctionnalités supplémentaires
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate("/register")}>Créer un compte</Button>
              <Button variant="outline" onClick={() => navigate("/login")}>Se connecter</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl font-bold mb-4">Nos Services Médicaux</h1>
              <p className="text-lg text-gray-600">
                Découvrez notre gamme complète de services médicaux conçus pour
                répondre à tous vos besoins de santé dans un environnement professionnel
                et bienveillant.
              </p>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="teleconsultation">Téléconsultation</TabsTrigger>
                <TabsTrigger value="children">Enfants</TabsTrigger>
                <TabsTrigger value="adults">Adultes</TabsTrigger>
                <TabsTrigger value="elderly">Seniors</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredServices.map((service) => (
                    <Card key={service.id} className="overflow-hidden transition-all hover:shadow-lg">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="p-2 bg-primary/10 rounded-md mr-3">
                              <service.icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>{service.name}</CardTitle>
                          </div>
                          {service.popular && (
                            <Badge variant="secondary">Populaire</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Euro className="h-4 w-4 mr-1" />
                            <span>{service.price} €</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{service.duration} min</span>
                          </div>
                          {service.teleconsultation && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Monitor className="h-3 w-3 mr-1" />
                              Téléconsultation
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end pt-0">
                        <Button onClick={() => handleBookAppointment(service)}>
                          Prendre rendez-vous
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {renderUserContent()}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
