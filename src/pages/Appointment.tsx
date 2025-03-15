
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewAppointmentForm from "@/components/appointment/NewAppointmentForm";
import { useToast } from "@/hooks/use-toast";

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const preselectedService = location.state?.preselectedService || "";

  useEffect(() => {
    // Notification pour la page de rendez-vous
    toast({
      title: "Prise de rendez-vous",
      description: "Remplissez le formulaire pour prendre rendez-vous avec nos médecins",
    });
  }, [toast]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prendre un rendez-vous</h1>
          <p className="text-lg text-gray-600">
            Complétez le formulaire ci-dessous pour réserver votre consultation
          </p>
        </div>

        <NewAppointmentForm preselectedService={preselectedService} />

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate(-1)} 
            className="text-primary-600 hover:text-primary-800 transition-colors"
          >
            &larr; Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
