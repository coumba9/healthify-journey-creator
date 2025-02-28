
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à votre espace",
        variant: "destructive",
      });
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              MediConnect
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Accueil
            </Link>
            <Link to="/doctors" className="text-gray-700 hover:text-primary">
              Trouver un médecin
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-primary">
              Fonctionnalités
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary">
              Tarifs
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-primary">
              FAQ
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => {
                    logout();
                    toast({
                      title: "Déconnexion réussie",
                      description: "Vous avez été déconnecté avec succès",
                    });
                    navigate('/');
                  }}
                >
                  Déconnexion
                </Button>
                <Button 
                  onClick={handleDashboardClick}
                >
                  Mon espace
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button>Inscription</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
