
interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
}

// Intégration avec l'API Wave réelle
export const initializeWavePayment = async (amount: number): Promise<PaymentResponse> => {
  try {
    console.log("Initialisation du paiement Wave pour", amount, "FCFA");
    
    // Appel à l'API Supabase Edge Function pour Wave
    const response = await fetch("/api/payments/wave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount, 
        redirectUrl: window.location.origin + "/dashboard/appointments?status=success",
        cancelUrl: window.location.origin + "/dashboard/appointments?status=cancelled"
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'initialisation du paiement Wave");
    }
    
    return {
      success: true,
      transactionId: data.transactionId,
      paymentUrl: data.paymentUrl
    };
  } catch (error) {
    console.error("Échec de la transaction Wave:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "La transaction Wave a échoué. Veuillez réessayer."
    };
  }
};

// Intégration avec l'API Orange Money réelle
export const initializeOrangeMoneyPayment = async (amount: number): Promise<PaymentResponse> => {
  try {
    console.log("Initialisation du paiement Orange Money pour", amount, "FCFA");
    
    // Appel à l'API Supabase Edge Function pour Orange Money
    const response = await fetch("/api/payments/orange-money", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount,
        redirectUrl: window.location.origin + "/dashboard/appointments?status=success",
        cancelUrl: window.location.origin + "/dashboard/appointments?status=cancelled"
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'initialisation du paiement Orange Money");
    }
    
    return {
      success: true,
      transactionId: data.transactionId,
      paymentUrl: data.paymentUrl
    };
  } catch (error) {
    console.error("Échec de la transaction Orange Money:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "La transaction Orange Money a échoué. Veuillez réessayer."
    };
  }
};

// Intégration avec l'API Moov Money réelle
export const initializeMoovMoneyPayment = async (amount: number): Promise<PaymentResponse> => {
  try {
    console.log("Initialisation du paiement Moov Money pour", amount, "FCFA");
    
    // Appel à l'API Supabase Edge Function pour Moov Money
    const response = await fetch("/api/payments/moov-money", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount,
        redirectUrl: window.location.origin + "/dashboard/appointments?status=success",
        cancelUrl: window.location.origin + "/dashboard/appointments?status=cancelled"
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'initialisation du paiement Moov Money");
    }
    
    return {
      success: true,
      transactionId: data.transactionId,
      paymentUrl: data.paymentUrl
    };
  } catch (error) {
    console.error("Échec de la transaction Moov Money:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "La transaction Moov Money a échoué. Veuillez réessayer."
    };
  }
};

// Intégration avec l'API Free Mobile Money réelle
export const initializeFreeMobileMoney = async (amount: number): Promise<PaymentResponse> => {
  try {
    console.log("Initialisation du paiement Free Mobile Money pour", amount, "FCFA");
    
    // Appel à l'API Supabase Edge Function pour Free Mobile Money
    const response = await fetch("/api/payments/free-mobile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount,
        redirectUrl: window.location.origin + "/dashboard/appointments?status=success",
        cancelUrl: window.location.origin + "/dashboard/appointments?status=cancelled"
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'initialisation du paiement Free Mobile Money");
    }
    
    return {
      success: true,
      transactionId: data.transactionId,
      paymentUrl: data.paymentUrl
    };
  } catch (error) {
    console.error("Échec de la transaction Free Mobile Money:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "La transaction Free Mobile Money a échoué. Veuillez réessayer."
    };
  }
};
