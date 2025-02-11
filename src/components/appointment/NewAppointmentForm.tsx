import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import PatientInfoStep from "./steps/PatientInfoStep";
import ConsultationTypeStep from "./steps/ConsultationTypeStep";
import DateTimeStep from "./steps/DateTimeStep";
import MedicalInfoStep from "./steps/MedicalInfoStep";
import PaymentStep from "./steps/PaymentStep";

const STEPS = [
  { id: 1, title: "Informations personnelles" },
  { id: 2, title: "Type de consultation" },
  { id: 3, title: "Date et heure" },
  { id: 4, title: "Informations médicales" },
  { id: 5, title: "Paiement" },
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
    });
  };

  const progress = (step / STEPS.length) * 100;

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
        <CardDescription className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{`Étape ${step}/${STEPS.length} - ${STEPS[step - 1].title}`}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Précédent
              </Button>
            )}
            {step < 5 && (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                className={step === 1 ? "w-full" : "ml-auto"}
              >
                Suivant
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewAppointmentForm;