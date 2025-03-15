
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Brain, Stethoscope, Syringe, Monitor, User, CalendarClock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Cardiologie",
    description: "Soins cardiaques spécialisés et prévention des maladies cardiaques.",
    icon: Heart,
    detailedDescription: "Notre service de cardiologie offre des diagnostics avancés, des consultations spécialisées et des suivis personnalisés pour toutes les affections cardiaques. Nos cardiologues expérimentés utilisent les technologies les plus récentes pour assurer une prise en charge optimale.",
    advantages: ["Équipement d'imagerie cardiaque de pointe", "Suivi personnalisé des patients cardiaques", "Programmes de réadaptation cardiaque"]
  },
  {
    title: "Neurologie",
    description: "Diagnostic et traitement des troubles du système nerveux.",
    icon: Brain,
    detailedDescription: "Notre équipe de neurologues est spécialisée dans le diagnostic et le traitement des troubles neurologiques, des maladies neurodégénératives et des problèmes liés au système nerveux central et périphérique.",
    advantages: ["Évaluation neurologique complète", "Électroencéphalographie (EEG)", "Traitement personnalisé des troubles neurologiques"]
  },
  {
    title: "Médecine générale",
    description: "Soins de santé primaires et préventifs pour toute la famille.",
    icon: Stethoscope,
    detailedDescription: "Nos médecins généralistes assurent des soins complets pour patients de tous âges. De la prévention au traitement des maladies courantes, notre équipe est là pour répondre à vos besoins de santé quotidiens.",
    advantages: ["Consultations rapides disponibles", "Suivi régulier pour les patients chroniques", "Approche familiale de la médecine"]
  },
  {
    title: "Urgences",
    description: "Service d'urgence disponible 24/7 pour tous types de situations.",
    icon: Syringe,
    detailedDescription: "Notre service d'urgence est accessible 24h/24 et 7j/7 pour traiter toutes les situations médicales urgentes. Une équipe de professionnels qualifiés est toujours prête à intervenir rapidement.",
    advantages: ["Disponibilité 24h/24, 7j/7", "Équipement de réanimation complet", "Prise en charge rapide"]
  },
  {
    title: "Téléconsultation",
    description: "Consultations à distance pour plus de flexibilité et de confort.",
    icon: Monitor,
    detailedDescription: "Notre service de téléconsultation vous permet de consulter nos médecins à distance, depuis votre domicile. Une solution idéale pour les patients à mobilité réduite ou les situations qui ne nécessitent pas d'examen physique.",
    advantages: ["Consultation depuis votre domicile", "Disponibilité élargie", "Réduction des délais d'attente"]
  },
  {
    title: "Pédiatrie",
    description: "Soins spécifiques aux enfants de la naissance à l'adolescence.",
    icon: User,
    detailedDescription: "Notre service de pédiatrie offre des soins complets pour les enfants, de la naissance à l'adolescence. Nos pédiatres assurent le suivi de la croissance, la prévention et le traitement des maladies infantiles.",
    advantages: ["Environnement adapté aux enfants", "Suivi vaccinal complet", "Conseils parentaux personnalisés"]
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const handleBookAppointment = (service) => {
    // Rediriger vers la page de prise de rendez-vous avec le service pré-sélectionné
    navigate("/appointment", { state: { preselectedService: service.title.toLowerCase() } });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Une gamme complète de services médicaux pour répondre à vos besoins
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-center mt-4">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center mb-4">
                  {service.description}
                </p>
                <div className="flex gap-2 justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedService(service)}>
                        En savoir plus
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <service.icon className="w-5 h-5 text-primary" />
                          {service.title}
                        </DialogTitle>
                        <DialogDescription>
                          {service.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>{service.detailedDescription}</p>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Nos points forts :</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {service.advantages.map((adv, i) => (
                              <li key={i} className="text-sm">{adv}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => handleBookAppointment(service)}>
                            Prendre rendez-vous
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => handleBookAppointment(service)}>
                    Rendez-vous
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" onClick={() => navigate("/services")} className="gap-2">
            Voir tous nos services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
