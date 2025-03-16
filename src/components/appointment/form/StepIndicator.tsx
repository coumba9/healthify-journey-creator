
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export type Step = {
  id: number;
  title: string;
  icon: string;
};

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{steps[currentStep - 1].icon}</span>
          <span className="font-medium">{steps[currentStep - 1].title}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          Étape {currentStep}/{steps.length}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-center gap-2 pt-2">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`w-3 h-3 rounded-full ${
              s.id === currentStep
                ? "bg-primary"
                : s.id < currentStep
                ? "bg-primary/50"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {steps.map((s, index) => (
          <div
            key={s.id}
            className={`flex items-center ${
              s.id < currentStep ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s.id === currentStep
                  ? "bg-primary text-white"
                  : s.id < currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-gray-100"
              }`}
            >
              {s.id < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                s.id
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 ${
                  s.id < currentStep ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
