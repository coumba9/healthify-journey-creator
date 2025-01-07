import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Brain, Stethoscope, Syringe } from "lucide-react";

const services = [
  {
    title: "Cardiologie",
    description: "Soins cardiaques spécialisés et prévention des maladies cardiaques.",
    icon: Heart,
  },
  {
    title: "Neurologie",
    description: "Diagnostic et traitement des troubles du système nerveux.",
    icon: Brain,
  },
  {
    title: "Médecine générale",
    description: "Soins de santé primaires et préventifs pour toute la famille.",
    icon: Stethoscope,
  },
  {
    title: "Urgences",
    description: "Service d'urgence disponible 24/7 pour tous types de situations.",
    icon: Syringe,
  },
];

const Services = () => {
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

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-primary-100 rounded-xl flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-center mt-4">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;