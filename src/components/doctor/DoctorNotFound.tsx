
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DoctorNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1>Médecin non trouvé</h1>
        <Button onClick={() => navigate('/doctors')}>Retour</Button>
      </div>
    </div>
  );
};

export default DoctorNotFound;
