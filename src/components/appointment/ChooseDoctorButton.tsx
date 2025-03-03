
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ChooseDoctorButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const ChooseDoctorButton = ({
  className,
  variant = "default"
}: ChooseDoctorButtonProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDoctorSelection = () => {
    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    // avec un paramètre redirect qui permettra de le rediriger vers la page des médecins après connexion
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à toutes les fonctionnalités",
      });
      navigate("/login?redirect=/doctors");
    } else {
      // Si l'utilisateur est connecté, on le redirige directement vers la page des médecins
      navigate("/doctors");
    }
  };

  return (
    <Button
      onClick={handleDoctorSelection}
      className={className}
      variant={variant}
    >
      <UserIcon className="mr-2 h-4 w-4" />
      Choisir un médecin
    </Button>
  );
};

export default ChooseDoctorButton;
