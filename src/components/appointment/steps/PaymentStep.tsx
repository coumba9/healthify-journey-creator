
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";
import PaymentMethodSelector from "../payment/PaymentMethodSelector";
import { usePaymentProcessing } from "../payment/PaymentProcessingService";

interface PaymentStepProps {
  amount: number;
  onPaymentComplete: () => void;
}

const PaymentStep = ({ amount, onPaymentComplete }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { isProcessing, error, processPayment } = usePaymentProcessing({
    amount,
    onPaymentComplete,
  });

  const handlePayment = () => {
    processPayment(paymentMethod);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary-600" />
        <div>
          <h3 className="text-lg font-medium">Paiement de la consultation</h3>
          <p className="text-sm text-gray-500">
            Montant à payer : {(amount / 100).toFixed(0)} FCFA
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <PaymentMethodSelector
        selectedMethod={paymentMethod}
        onMethodChange={setPaymentMethod}
      />

      <Button
        onClick={handlePayment}
        disabled={!paymentMethod || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          "Payer maintenant"
        )}
      </Button>
    </div>
  );
};

export default PaymentStep;
