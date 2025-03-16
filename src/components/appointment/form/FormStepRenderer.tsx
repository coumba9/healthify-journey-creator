
import PatientInfoStep from "../steps/PatientInfoStep";
import ConsultationTypeStep from "../steps/ConsultationTypeStep";
import DateTimeStep from "../steps/DateTimeStep";
import MedicalInfoStep from "../steps/MedicalInfoStep";
import PaymentStep from "../steps/PaymentStep";
import { AppointmentFormData } from "@/hooks/useAppointmentForm";

interface FormStepRendererProps {
  step: number;
  formData: AppointmentFormData;
  setFormData: (formData: AppointmentFormData) => void;
  createAccount: boolean;
  setCreateAccount: (createAccount: boolean) => void;
  onPaymentComplete: () => void;
}

const FormStepRenderer = ({
  step,
  formData,
  setFormData,
  createAccount,
  setCreateAccount,
  onPaymentComplete
}: FormStepRendererProps) => {
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
          amount={formData.consultationType === "teleconsultation" ? 12000 : 15000}
          onPaymentComplete={onPaymentComplete}
        />
      );
    default:
      return null;
  }
};

export default FormStepRenderer;
