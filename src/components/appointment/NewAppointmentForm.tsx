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
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

import PatientInfoStep from "./steps/PatientInfoStep";
import ConsultationTypeStep from "./steps/ConsultationTypeStep";
import DateTimeStep from "./steps/DateTimeStep";
import MedicalInfoStep from "./steps/MedicalInfoStep";
import PaymentStep from "./steps/PaymentStep";

const STEPS = [
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
      variant: "success",
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

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Prendre un rendez-vous</CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{STEPS[step - 1].icon}</span>
              <span className="font-medium">{STEPS[step - 1].title}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Étape {step}/{STEPS.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-center gap-2 pt-2">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`w-3 h-3 rounded-full ${
                  s.id === step
                    ? "bg-primary"
                    : s.id < step
                    ? "bg-primary/50"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
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
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
            )}
            {step < 5 && (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                className={step === 1 ? "w-full" : "ml-auto"}
                disabled={!isStepComplete(step)}
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`flex items-center ${
                  s.id < step ? "text-primary" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s.id === step
                      ? "bg-primary text-white"
                      : s.id < step
                      ? "bg-primary/20 text-primary"
                      : "bg-gray-100"
                  }`}
                >
                  {s.id < step ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    s.id
                  )}
                </div>
                {s.id < STEPS.length && (
                  <div
                    className={`w-8 h-0.5 ${
                      s.id < step ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewAppointmentForm;