
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  initializeWavePayment, 
  initializeOrangeMoneyPayment,
  initializeMoovMoneyPayment,
  initializeFreeMobileMoney 
} from "@/services/paymentService";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentStepProps {
  amount: number;
  onPaymentComplete: () => void;
}

const PaymentStep = ({ amount, onPaymentComplete }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      let paymentResponse;

      switch(paymentMethod) {
        case "wave":
          paymentResponse = await initializeWavePayment(amount);
          break;
        case "orange-money":
          paymentResponse = await initializeOrangeMoneyPayment(amount);
          break;
        case "free-mobile":
          paymentResponse = await initializeFreeMobileMoney(amount);
          break;
        case "moov-money":
          paymentResponse = await initializeMoovMoneyPayment(amount);
          break;
        default:
          throw new Error("Méthode de paiement non valide");
      }

      if (paymentResponse.success) {
        toast({
          title: "Paiement initié",
          description: "Suivez les instructions sur votre téléphone pour compléter le paiement.",
        });
        
        // If this is a real integration, we would redirect to the payment URL
        // window.location.href = paymentResponse.paymentUrl;
        
        // For demo purposes, we'll just simulate a successful payment
        setTimeout(() => {
          onPaymentComplete();
        }, 3000);
      } else {
        setError(paymentResponse.error || "Une erreur est survenue lors du traitement du paiement");
        toast({
          title: "Erreur lors du paiement",
          description: paymentResponse.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue lors du traitement du paiement";
      setError(errorMessage);
      toast({
        title: "Erreur de paiement",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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

      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="grid gap-4"
      >
        <div>
          <Label className="text-base">Choisissez votre moyen de paiement</Label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="relative cursor-pointer hover:border-primary-500 transition-colors">
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
                    Paiement sécurisé via Wave
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative cursor-pointer hover:border-primary-500 transition-colors">
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
                    Paiement sécurisé via Orange Money
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative cursor-pointer hover:border-primary-500 transition-colors">
            <CardContent className="p-6">
              <RadioGroupItem
                value="moov-money"
                id="moov-money"
                className="absolute right-4 top-4"
              />
              <div className="flex items-center space-x-4">
                <img
                  src="/moov-money-logo.png"
                  alt="Moov Money"
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div>
                  <Label htmlFor="moov-money" className="text-base">
                    Moov Money
                  </Label>
                  <p className="text-sm text-gray-500">
                    Paiement sécurisé via Moov Money
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative cursor-pointer hover:border-primary-500 transition-colors">
            <CardContent className="p-6">
              <RadioGroupItem
                value="free-mobile"
                id="free-mobile"
                className="absolute right-4 top-4"
              />
              <div className="flex items-center space-x-4">
                <img
                  src="/free-mobile-logo.png"
                  alt="Free Mobile Money"
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div>
                  <Label htmlFor="free-mobile" className="text-base">
                    Free Mobile Money
                  </Label>
                  <p className="text-sm text-gray-500">
                    Paiement sécurisé via Free Mobile Money
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
          "Payer maintenant"
        )}
      </Button>
    </div>
  );
};

export default PaymentStep;
