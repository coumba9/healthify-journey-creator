
// Mock Twilio service that simulates SMS functionality
// Will be replaced with actual Twilio integration once dependency issues are resolved

interface SMSMessage {
  to: string;
  body: string;
}

class MockTwilioService {
  // Simulate sending an SMS
  async sendSMS(to: string, body: string): Promise<{ success: boolean; message: string }> {
    console.log(`[MOCK TWILIO] Sending SMS to ${to}: ${body}`);
    
    // Format phone number correctly
    const formattedNumber = this.formatPhoneNumber(to);
    if (!formattedNumber) {
      return { 
        success: false, 
        message: "Format de numéro invalide. Utilisez le format +221 XX XXX XX XX" 
      };
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success for testing
    return { 
      success: true, 
      message: `SMS envoyé avec succès à ${to}` 
    };
  }

  // Simulate sending a test message
  async sendTestSMS(to: string): Promise<{ success: boolean; message: string }> {
    return this.sendSMS(
      to, 
      "Ceci est un message test pour vos rappels de rendez-vous médicaux. Merci d'utiliser notre service!"
    );
  }
  
  // Simulate sending an appointment reminder
  async sendAppointmentReminder(
    to: string, 
    doctorName: string, 
    date: string, 
    time: string
  ): Promise<{ success: boolean; message: string }> {
    const body = `Rappel: Vous avez un rendez-vous avec Dr. ${doctorName} le ${date} à ${time}. Merci de confirmer votre présence.`;
    return this.sendSMS(to, body);
  }

  // Helper to format phone numbers
  private formatPhoneNumber(phone: string): string | null {
    // Remove spaces and other non-digit characters except for the + sign
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Check if it starts with + and has a reasonable length
    if (cleaned.startsWith('+') && cleaned.length >= 10) {
      return cleaned;
    }
    
    // Add +221 prefix if it's just digits and seems like a valid number
    if (/^\d+$/.test(cleaned) && cleaned.length >= 9) {
      return `+221${cleaned}`;
    }
    
    return null;
  }
}

// Export a singleton instance
export const twilioService = new MockTwilioService();
