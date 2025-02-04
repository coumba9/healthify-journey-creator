import { Search, CheckSquare, Calendar } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Recherchez",
    description: "Choisissez une spécialité et un lieu",
  },
  {
    icon: CheckSquare,
    title: "Sélectionnez",
    description: "Consultez les disponibilités et les profils",
  },
  {
    icon: Calendar,
    title: "Réservez",
    description: "Confirmez en ligne et recevez un rappel",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Prenez rendez-vous en 3 étapes simples
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100">
                    <step.icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;