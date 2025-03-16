
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "./button";
import { useNavigate, useLocation } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === "/") {
      return;
    }
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <Button variant="outline" size="sm" onClick={handleBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>
      {location.pathname !== "/" && (
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          <Home className="h-4 w-4 mr-2" />
          Accueil
        </Button>
      )}
    </div>
  );
};
