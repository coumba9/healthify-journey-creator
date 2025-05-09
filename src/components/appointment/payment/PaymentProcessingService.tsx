
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  initializeWavePayment,
  initializeOrangeMoneyPayment,
  initializeMoovMoneyPayment,
  initializeFreeMobileMoney,
} from "@/services/paymentService";

interface UsePaymentProcessingProps {
  amount: number;
  onPaymentComplete: () => void;
}

export const usePaymentProcessing = ({
  amount,
  onPaymentComplete,
}: UsePaymentProcessingProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const processPayment = async (paymentMethod: string) => {
    if (!paymentMethod) {
      setError("Veuillez sélectionner une méthode de paiement");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      let paymentResponse;

      switch (paymentMethod) {
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
          description: "Vous êtes redirigé vers la plateforme de paiement...",
        });

        if (paymentResponse.paymentUrl) {
          // Redirection réelle vers la plateforme de paiement
          window.location.href = paymentResponse.paymentUrl;
          
          // Le callback onPaymentComplete sera appelé au retour de la plateforme
          // via l'URL de retour configurée dans les services de paiement
        } else {
          setError("URL de paiement manquante. Veuillez réessayer.");
        }
      } else {
        setError(
          paymentResponse.error ||
            "Une erreur est survenue lors du traitement du paiement"
        );
        toast({
          title: "Erreur lors du paiement",
          description: paymentResponse.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors du traitement du paiement";
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

  return {
    isProcessing,
    error,
    processPayment,
  };
};
