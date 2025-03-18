
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { twilioService } from "@/services/twilioService";
import { AppointmentFormData, useAppointmentForm } from "@/hooks/useAppointmentForm";
import StepIndicator from "./form/StepIndicator";
import FormStepNavigation from "./form/FormStepNavigation";
import { FORM_STEPS } from "./form/StepConstants";
import FormStepRenderer from "./form/FormStepRenderer";

export interface NewAppointmentFormProps {
  preselectedService?: string;
  preselectedDoctor?: string;
  isRescheduling?: boolean;
  originalAppointmentId?: string | null;
}

const NewAppointmentForm = ({ 
  preselectedService = "", 
  preselectedDoctor = "",
  isRescheduling = false, 
  originalAppointmentId = null 
}: NewAppointmentFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    formData,
    setFormData,
    step,
    createAccount,
    setCreateAccount,
    nextStep,
    prevStep,
    isStepComplete
  } = useAppointmentForm({ 
    preselectedService, 
    preselectedDoctor,
    isRescheduling, 
    originalAppointmentId 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment data:", formData);
    
    // Send confirmation SMS if phone number is available and SMS reminders are enabled
    if (formData.smsReminder && formData.phone) {
      console.log("Sending appointment confirmation SMS to:", formData.phone);
      twilioService.sendAppointmentReminder(
        formData.phone,
        formData.doctorName || "Cabinet Médical",
        formData.date,
        formData.time
      ).then(result => {
        console.log("SMS confirmation result:", result);
      }).catch(error => {
        console.error("Error sending confirmation SMS:", error);
      });
    }
    
    // Rediriger vers la page de confirmation
    navigate('/appointment-confirmation', { 
      state: { 
        appointmentData: formData
      } 
    });
  };

  const handlePaymentComplete = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    toast({
      title: "Paiement réussi",
      description: "Votre rendez-vous a été confirmé.",
      variant: "default",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isRescheduling ? "Reprogrammer un rendez-vous" : "Prendre un rendez-vous"}
        </CardTitle>
        <CardDescription>
          <StepIndicator steps={FORM_STEPS} currentStep={step} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormStepRenderer 
            step={step}
            formData={formData}
            setFormData={setFormData}
            createAccount={createAccount}
            setCreateAccount={setCreateAccount}
            onPaymentComplete={handlePaymentComplete}
          />
          
          <FormStepNavigation
            currentStep={step}
            totalSteps={FORM_STEPS.length}
            onBack={prevStep}
            onNext={nextStep}
            isNextDisabled={!isStepComplete(step)}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default NewAppointmentForm;
