import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PaymentStepProps {
  amount: number;
  onPaymentComplete: () => void;
}

const PaymentStep = ({ amount, onPaymentComplete }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      // Ici nous simulerons le paiement pour l'instant
      // TODO: Intégrer l'API de paiement réelle
      toast({
        title: "Paiement en cours",
        description: "Veuillez patienter...",
      });

      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Paiement réussi",
        description: "Votre paiement a été traité avec succès.",
      });

      onPaymentComplete();
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du paiement.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Paiement de la consultation</h3>
        <p className="text-sm text-gray-500">
          Montant à payer : {amount.toFixed(2)} FCFA
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
                    Wave
                  </Label>
                  <p className="text-sm text-gray-500">
                    Paiement via Wave Mobile Money
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
                    Orange Money
                  </Label>
                  <p className="text-sm text-gray-500">
                    Paiement via Orange Money
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </RadioGroup>

      <Button
        onClick={handlePayment}
        disabled={!paymentMethod}
        className="w-full"
      >
        Procéder au paiement
      </Button>
    </div>
  );
};

export default PaymentStep;