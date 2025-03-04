
interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
}

// Simulation du paiement Wave
export const initializeWavePayment = async (amount: number): Promise<PaymentResponse> => {
  console.log("Initialisation du paiement Wave pour", amount, "FCFA");
  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simuler un succès 90% du temps
  const isSuccess = Math.random() < 0.9;
  
  if (isSuccess) {
    const transactionId = `WAVE-${Math.random().toString(36).substring(2, 15)}`;
    console.log("Transaction Wave réussie:", transactionId);
    return {
      success: true,
      transactionId,
      paymentUrl: `https://api.wave.com/pay?txid=${transactionId}`
    };
  }
  
  console.error("Échec de la transaction Wave");
  return {
    success: false,
    error: "La transaction Wave a échoué. Veuillez réessayer."
  };
};

// Simulation du paiement Orange Money
export const initializeOrangeMoneyPayment = async (amount: number): Promise<PaymentResponse> => {
  console.log("Initialisation du paiement Orange Money pour", amount, "FCFA");
  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simuler un succès 90% du temps
  const isSuccess = Math.random() < 0.9;
  
  if (isSuccess) {
    const transactionId = `OM-${Math.random().toString(36).substring(2, 15)}`;
    console.log("Transaction Orange Money réussie:", transactionId);
    return {
      success: true,
      transactionId,
      paymentUrl: `https://api.orange.com/orange-money-webpay/pay?txid=${transactionId}`
    };
  }
  
  console.error("Échec de la transaction Orange Money");
  return {
    success: false,
    error: "La transaction Orange Money a échoué. Veuillez réessayer."
  };
};

// Simulation du paiement Moov Money
export const initializeMoovMoneyPayment = async (amount: number): Promise<PaymentResponse> => {
  console.log("Initialisation du paiement Moov Money pour", amount, "FCFA");
  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simuler un succès 85% du temps
  const isSuccess = Math.random() < 0.85;
  
  if (isSuccess) {
    const transactionId = `MOOV-${Math.random().toString(36).substring(2, 15)}`;
    console.log("Transaction Moov Money réussie:", transactionId);
    return {
      success: true,
      transactionId,
      paymentUrl: `https://api.moov.africa/payment/gateway?txid=${transactionId}`
    };
  }
  
  console.error("Échec de la transaction Moov Money");
  return {
    success: false,
    error: "La transaction Moov Money a échoué. Veuillez vérifier votre solde et réessayer."
  };
};

// Simulation du paiement Free Mobile Money
export const initializeFreeMobileMoney = async (amount: number): Promise<PaymentResponse> => {
  console.log("Initialisation du paiement Free Mobile Money pour", amount, "FCFA");
  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Simuler un succès 88% du temps
  const isSuccess = Math.random() < 0.88;
  
  if (isSuccess) {
    const transactionId = `FREE-${Math.random().toString(36).substring(2, 15)}`;
    console.log("Transaction Free Mobile Money réussie:", transactionId);
    return {
      success: true,
      transactionId,
      paymentUrl: `https://api.free.sn/payment/checkout?txid=${transactionId}`
    };
  }
  
  console.error("Échec de la transaction Free Mobile Money");
  return {
    success: false,
    error: "La transaction Free Mobile Money a échoué. Veuillez vérifier votre numéro et réessayer."
  };
};
