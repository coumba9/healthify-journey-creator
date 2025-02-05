import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Prenez rendez-vous en ligne avec un professionnel de santé
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Trouvez rapidement un médecin près de chez vous et prenez rendez-vous en quelques clics
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button 
            size="lg"
            onClick={() => navigate('/doctors')}
            className="bg-primary hover:bg-primary/90"
          >
            Choisir un médecin
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/register?type=doctor')}
          >
            Vous êtes médecin ?
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;