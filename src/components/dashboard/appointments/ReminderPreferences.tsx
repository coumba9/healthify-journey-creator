
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { twilioService } from "@/services/twilioService";

const ReminderPreferences = () => {
  const { toast } = useToast();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [timePreference, setTimePreference] = useState("24h");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSavePreferences = () => {
    // Ici, nous simulons la sauvegarde des préférences
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de rappel ont été mises à jour avec succès.",
    });
  };

  const handleTestSMS = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un numéro de téléphone valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const result = await twilioService.sendTestSMS(phoneNumber);
      
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
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du SMS.",
        variant: "destructive",
      });
      console.error("SMS error:", error);
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

        <Button onClick={handleSavePreferences} className="w-full">
          Enregistrer les préférences
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReminderPreferences;
