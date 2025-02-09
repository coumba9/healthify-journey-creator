import { toast } from "@/hooks/use-toast";

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const initializeWavePayment = async (amount: number): Promise<PaymentResponse> => {
  try {
    const response = await fetch("/api/payments/wave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de l'initialisation du paiement Wave:", error);
    return { success: false, error: "Erreur lors de l'initialisation du paiement" };
  }
};

export const initializeOrangeMoneyPayment = async (amount: number): Promise<PaymentResponse> => {
  try {
    const response = await fetch("/api/payments/orange-money", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de l'initialisation du paiement Orange Money:", error);
    return { success: false, error: "Erreur lors de l'initialisation du paiement" };
  }
};