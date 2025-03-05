
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { twilioService } from "@/services/twilioService";
import { useAuth } from "@/contexts/AuthContext";

const ReminderPreferences = () => {
  const { toast } = useToast();
  const { user, updateProfile } = useAuth();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [timePreference, setTimePreference] = useState("24h");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update phone number field when user data changes
  useEffect(() => {
    if (user?.phone) {
      setPhoneNumber(user.phone);
    }
  }, [user]);

  const handleSavePreferences = async () => {
    setIsSaving(true);
    try {
      // Si le SMS est activé, mettre à jour le numéro de téléphone
      if (smsEnabled && phoneNumber && user) {
        console.log("Updating user profile with phone:", phoneNumber);
        await updateProfile({ phone: phoneNumber });
      }
      
      // Ici, nous simulons la sauvegarde des préférences
      setTimeout(() => {
        toast({
          title: "Préférences enregistrées",
          description: "Vos préférences de rappel ont été mises à jour avec succès.",
        });
        setIsSaving(false);
      }, 800);
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des préférences.",
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  const handleTestSMS = async () => {
    if (!phoneNumber || phoneNumber.trim().length < 8) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un numéro de téléphone valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    console.log("Sending test SMS to:", phoneNumber);
    
    try {
      const result = await twilioService.sendTestSMS(phoneNumber);
      console.log("SMS test result:", result);
      
      if (result.success) {
        toast({
          title: "SMS envoyé",
          description: "Un SMS de test a été envoyé à votre numéro.",
        });
      } else {
        toast({
          title: "Échec de l'envoi",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("SMS error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du SMS.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Préférences de rappel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <Label htmlFor="email-notifications">Rappels par email</Label>
            </div>
            <Switch
              id="email-notifications"
              checked={emailEnabled}
              onCheckedChange={setEmailEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <Label htmlFor="sms-notifications">Rappels par SMS</Label>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsEnabled}
              onCheckedChange={setSmsEnabled}
            />
          </div>

          {smsEnabled && (
            <div className="space-y-2 pt-2 pb-2 border-t border-b">
              <Label htmlFor="phone-number">Numéro de téléphone pour les SMS</Label>
              <div className="flex gap-2">
                <Input
                  id="phone-number"
                  type="tel"
                  placeholder="+221 XX XXX XX XX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleTestSMS}
                  disabled={isSending || !phoneNumber}
                >
                  {isSending ? "Envoi..." : "Tester"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Format: code pays + numéro (ex: +221 77 123 45 67)
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Délai de rappel</Label>
          <div className="flex gap-2">
            {["24h", "48h", "72h"].map((time) => (
              <Button
                key={time}
                variant={timePreference === time ? "default" : "outline"}
                size="sm"
                onClick={() => setTimePreference(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSavePreferences} 
          className="w-full"
          disabled={isSaving}
        >
          {isSaving ? "Enregistrement..." : "Enregistrer les préférences"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReminderPreferences;
