
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PatientInfoStep from "./steps/PatientInfoStep";
import ConsultationTypeStep from "./steps/ConsultationTypeStep";
import DateTimeStep from "./steps/DateTimeStep";
import MedicalInfoStep from "./steps/MedicalInfoStep";
import PaymentStep from "./steps/PaymentStep";
import StepIndicator, { Step } from "./form/StepIndicator";
import FormStepNavigation from "./form/FormStepNavigation";

const STEPS: Step[] = [
  { id: 1, title: "Informations personnelles", icon: "👤" },
  { id: 2, title: "Type de consultation", icon: "🏥" },
  { id: 3, title: "Date et heure", icon: "📅" },
  { id: 4, title: "Informations médicales", icon: "📋" },
  { id: 5, title: "Paiement", icon: "💳" },
];

const NewAppointmentForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [createAccount, setCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    // Patient info
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    forSomeoneElse: false,
    beneficiaryName: "",
    
    // Appointment details
    date: "",
    time: "",
    service: "",
    consultationType: "cabinet",
    urgency: false,
    reason: "",
    symptoms: "",
    
    // Medical info
    allergies: "",
    currentMedications: "",
    documents: [] as File[],
    
    // Insurance
    insurance: "",
    insuranceNumber: "",
    
    // Reminders
    emailReminder: true,
    smsReminder: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment data:", formData);
    toast({
      title: "Rendez-vous programmé",
      description: "Nous vous contacterons pour confirmer votre rendez-vous.",
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const isStepComplete = (stepNumber: number) => {
    if (stepNumber === 1) {
      return formData.name && formData.email && formData.phone;
    }
    if (stepNumber === 2) {
      return formData.consultationType && formData.service;
    }
    if (stepNumber === 3) {
      return formData.date && formData.time;
    }
    if (stepNumber === 4) {
      return true; // Optional step
    }
    return false;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PatientInfoStep
            formData={formData}
            setFormData={setFormData}
            createAccount={createAccount}
            setCreateAccount={setCreateAccount}
          />
        );
      case 2:
        return (
          <ConsultationTypeStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <DateTimeStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <MedicalInfoStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 5:
        return (
          <PaymentStep
            amount={15000}
            onPaymentComplete={handlePaymentComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Prendre un rendez-vous</CardTitle>
        <CardDescription>
          <StepIndicator steps={STEPS} currentStep={step} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          
          <FormStepNavigation
            currentStep={step}
            totalSteps={STEPS.length}
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
