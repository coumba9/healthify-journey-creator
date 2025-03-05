
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
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Randomly succeed or fail to simulate real-world conditions
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      return { 
        success: true, 
        message: `SMS sent successfully to ${to}` 
      };
    } else {
      return { 
        success: false, 
        message: "Failed to send SMS: Network error" 
      };
    }
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
}

// Export a singleton instance
export const twilioService = new MockTwilioService();
