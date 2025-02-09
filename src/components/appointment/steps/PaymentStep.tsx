import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { initializeWavePayment, initializeOrangeMoneyPayment } from "@/services/paymentService";
import { Loader2 } from "lucide-react";

interface PaymentStepProps {
  amount: number;
  onPaymentComplete: () => void;
}

const PaymentStep = ({ amount, onPaymentComplete }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      let paymentResponse;

      if (paymentMethod === "wave") {
        paymentResponse = await initializeWavePayment(amount);
      } else if (paymentMethod === "orange-money") {
        paymentResponse = await initializeOrangeMoneyPayment(amount);
      } else {
        throw new Error("Méthode de paiement non valide");
      }

      if (paymentResponse.success) {
        toast({
          title: "Paiement réussi (Mode Démo)",
          description: `ID Transaction: ${paymentResponse.transactionId}`,
        });
        onPaymentComplete();
      } else {
        toast({
          title: "Erreur de paiement (Mode Démo)",
          description: paymentResponse.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement du paiement",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Paiement de la consultation (Mode Démo)</h3>
        <p className="text-sm text-gray-500">
          Montant à payer : {(amount / 100).toFixed(2)} FCFA
        </p>
      </div>

      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="grid gap-4"
      >
        <div>
          <Label className="text-base">Choisissez votre moyen de paiement</Label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="relative">
            <CardContent className="p-6">
              <RadioGroupItem
                value="wave"
                id="wave"
                className="absolute right-4 top-4"
              />
              <div className="flex items-center space-x-4">
                <img
                  src="/wave-logo.png"
                  alt="Wave"
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <Label htmlFor="wave" className="text-base">
                    Wave (Démo)
                  </Label>
                  <p className="text-sm text-gray-500">
                    Simulation de paiement Wave
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative">
            <CardContent className="p-6">
              <RadioGroupItem
                value="orange-money"
                id="orange-money"
                className="absolute right-4 top-4"
              />
              <div className="flex items-center space-x-4">
                <img
                  src="/orange-money-logo.png"
                  alt="Orange Money"
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <Label htmlFor="orange-money" className="text-base">
                    Orange Money (Démo)
                  </Label>
                  <p className="text-sm text-gray-500">
                    Simulation de paiement Orange Money
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </RadioGroup>

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
          "Procéder au paiement (Démo)"
        )}
      </Button>
    </div>
  );
};

export default PaymentStep;