
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FormStepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
}

const FormStepNavigation = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled,
}: FormStepNavigationProps) => {
  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>
      )}
      {currentStep < totalSteps && (
        <Button
          type="button"
          onClick={onNext}
          className={currentStep === 1 ? "w-full" : "ml-auto"}
          disabled={isNextDisabled}
        >
          Suivant
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default FormStepNavigation;
