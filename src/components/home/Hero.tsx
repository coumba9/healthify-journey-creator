
import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ChooseDoctorButton from "@/components/appointment/ChooseDoctorButton";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background py-20">
      <div className="container flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Des soins médicaux de qualité accessibles à tous
          </h1>
          <p className="text-xl text-muted-foreground max-w-prose">
            Prenez facilement rendez-vous avec des médecins qualifiés, consultez
            vos dossiers médicaux et recevez des conseils de santé personnalisés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ChooseDoctorButton />
            
            <Button variant="outline" asChild>
              <Link to="/appointment">
                <Calendar className="mr-2 h-4 w-4" />
                Prendre rendez-vous
              </Link>
            </Button>
            
            <Link to="/services">
              <Button variant="ghost">Découvrir nos services</Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 order-first md:order-last">
          <img
            src="/placeholder.svg"
            alt="Medical illustration"
            className="mx-auto w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
