interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

// Simulation du paiement Wave
export const initializeWavePayment = async (amount: number): Promise<PaymentResponse> => {
  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simuler un succès 90% du temps
  const isSuccess = Math.random() < 0.9;
  
  if (isSuccess) {
    return {
      success: true,
      transactionId: `WAVE-${Math.random().toString(36).substring(2, 15)}`
    };
  }
  
  return {
    success: false,
    error: "La transaction a échoué. Veuillez réessayer."
  };
};

// Simulation du paiement Orange Money
export const initializeOrangeMoneyPayment = async (amount: number): Promise<PaymentResponse> => {
  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simuler un succès 90% du temps
  const isSuccess = Math.random() < 0.9;
  
  if (isSuccess) {
    return {
      success: true,
      transactionId: `OM-${Math.random().toString(36).substring(2, 15)}`
    };
  }
  
  return {
    success: false,
    error: "La transaction a échoué. Veuillez réessayer."
  };
};