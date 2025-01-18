import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReminderPreferences = () => {
  const { toast } = useToast();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [timePreference, setTimePreference] = useState("24h");

  const handleSavePreferences = () => {
    // Ici, nous simulons la sauvegarde des préférences
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de rappel ont été mises à jour avec succès.",
    });
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