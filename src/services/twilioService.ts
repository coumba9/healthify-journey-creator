
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
      console.error(`[MOCK TWILIO] Invalid phone number format: ${to}`);
      return { 
        success: false, 
        message: "Format de numéro invalide. Utilisez le format +221 XX XXX XX XX" 
      };
    }
    
    console.log(`[MOCK TWILIO] Formatted number: ${formattedNumber}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a mock environment, always return success for testing purposes
    return { 
      success: true, 
      message: `SMS envoyé avec succès à ${formattedNumber}` 
    };
  }

  // Simulate sending a test message
  async sendTestSMS(to: string): Promise<{ success: boolean; message: string }> {
    console.log(`[MOCK TWILIO] Attempting to send test SMS to: ${to}`);
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
    if (!phone || phone.trim() === '') {
      console.error('[MOCK TWILIO] Empty phone number provided');
      return null;
    }
    
    // Remove spaces and other non-digit characters except for the + sign
    let cleaned = phone.replace(/[^\d+]/g, '');
    console.log(`[MOCK TWILIO] Cleaned number: ${cleaned}`);
    
    // If number already starts with +, assume it's in international format
    if (cleaned.startsWith('+')) {
      // Ensure it has enough digits for a valid number (at least 10 after the +)
      if (cleaned.length >= 11) {
        return cleaned;
      } else {
        console.error('[MOCK TWILIO] Number with + prefix too short');
        return null;
      }
    }
    
    // If it starts with 00, replace with +
    if (cleaned.startsWith('00')) {
      cleaned = '+' + cleaned.substring(2);
      return cleaned;
    }
    
    // For Senegalese numbers, handle common patterns
    if (/^(33|70|75|76|77|78)/.test(cleaned) && cleaned.length >= 9) {
      return `+221${cleaned}`;
    }
    
    // If it's just digits and reasonably long, assume it's a local number and add Senegal prefix
    if (/^\d+$/.test(cleaned) && cleaned.length >= 8) {
      return `+221${cleaned}`;
    }
    
    console.error('[MOCK TWILIO] Could not format number properly');
    return null;
  }
}

// Export a singleton instance
export const twilioService = new MockTwilioService();
