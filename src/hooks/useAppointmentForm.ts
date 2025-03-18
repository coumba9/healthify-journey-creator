
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

export interface AppointmentFormData {
  // Patient info
  name: string;
  email: string;
  phone: string;
  forSomeoneElse: boolean;
  beneficiaryName: string;
  
  // Appointment details
  date: string;
  time: string;
  service: string;
  doctorId: string;
  doctorName: string;
  consultationType: string;
  urgency: boolean;
  teleconsultationDevice: string;
  reason: string;
  symptoms: string;
  
  // Medical info
  allergies: string;
  currentMedications: string;
  documents: File[];
  
  // Insurance
  insurance: string;
  insuranceNumber: string;
  
  // Reminders
  emailReminder: boolean;
  smsReminder: boolean;
}

interface UseAppointmentFormProps {
  preselectedService?: string;
  preselectedDoctor?: string;
  isRescheduling?: boolean;
  originalAppointmentId?: string | null;
}

export function useAppointmentForm({
  preselectedService = "",
  preselectedDoctor = "",
  isRescheduling = false,
  originalAppointmentId = null
}: UseAppointmentFormProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [createAccount, setCreateAccount] = useState(false);
  const [formData, setFormData] = useState<AppointmentFormData>({
    // Patient info
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    forSomeoneElse: false,
    beneficiaryName: "",
    
    // Appointment details
    date: "",
    time: "",
    service: preselectedService || "",
    doctorId: "",
    doctorName: preselectedDoctor || "",
    consultationType: "cabinet",
    urgency: false,
    teleconsultationDevice: "computer",
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

  // Update form data when user data changes or preselected service changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
    
    if (preselectedService) {
      setFormData(prev => ({
        ...prev,
        service: preselectedService
      }));
    }

    if (preselectedDoctor) {
      setFormData(prev => ({
        ...prev,
        doctorName: preselectedDoctor
      }));
    }
  }, [user, preselectedService, preselectedDoctor]);

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const isStepComplete = (stepNumber: number) => {
    if (stepNumber === 1) {
      // Patient info step
      if (user) return true; // User is already logged in
      return Boolean(formData.name && formData.email && formData.phone);
    }
    if (stepNumber === 2) {
      // Consultation type step
      return Boolean(formData.consultationType && formData.service && formData.doctorName);
    }
    if (stepNumber === 3) {
      // Date time step
      return Boolean(formData.date && formData.time);
    }
    if (stepNumber === 4) {
      // Medical info step - optional
      return true;
    }
    return true;
  };

  return {
    formData,
    setFormData,
    step,
    setStep,
    createAccount,
    setCreateAccount,
    nextStep,
    prevStep,
    isStepComplete,
    isRescheduling,
    originalAppointmentId
  };
}
