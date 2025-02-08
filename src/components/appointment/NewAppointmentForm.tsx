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

import PatientInfoStep from "./steps/PatientInfoStep";
import ConsultationTypeStep from "./steps/ConsultationTypeStep";
import DateTimeStep from "./steps/DateTimeStep";
import MedicalInfoStep from "./steps/MedicalInfoStep";
import PaymentStep from "./steps/PaymentStep";

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
            amount={15000} // Montant fixe pour l'exemple
            onPaymentComplete={() => handleSubmit}
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
          {`Étape ${step}/5 - ${
            step === 1
              ? "Informations personnelles"
              : step === 2
              ? "Type de consultation"
              : step === 3
              ? "Date et heure"
              : step === 4
              ? "Informations médicales"
              : "Paiement"
          }`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Précédent
              </Button>
            )}
            {step < 5 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto"
              >
                Suivant
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewAppointmentForm;