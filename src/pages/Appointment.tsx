
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewAppointmentForm from "@/components/appointment/NewAppointmentForm";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/ui/back-button";

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const preselectedService = location.state?.preselectedService || "";
  const preselectedDoctor = location.state?.preselectedDoctor || "";
  const isRescheduling = location.state?.isRescheduling || false;
  const originalAppointmentId = location.state?.originalAppointmentId || null;

  useEffect(() => {
    // Notification pour la page de rendez-vous
    toast({
      title: isRescheduling ? "Reprogrammation de rendez-vous" : "Prise de rendez-vous",
      description: isRescheduling 
        ? "Modifiez les détails pour reprogrammer votre rendez-vous" 
        : "Remplissez le formulaire pour prendre rendez-vous avec nos médecins",
    });
  }, [toast, isRescheduling]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isRescheduling ? "Reprogrammer votre rendez-vous" : "Prendre un rendez-vous"}
          </h1>
          <p className="text-lg text-gray-600">
            {isRescheduling
              ? "Modifiez la date et l'heure de votre rendez-vous"
              : "Complétez le formulaire ci-dessous pour réserver votre consultation"}
          </p>
        </div>

        <NewAppointmentForm 
          preselectedService={preselectedService}
          preselectedDoctor={preselectedDoctor}
          isRescheduling={isRescheduling}
          originalAppointmentId={originalAppointmentId}
        />
      </div>
    </div>
  );
};

export default Appointment;
