import { User, Video } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ConsultationTypeStepProps {
  formData: {
    consultationType: string;
    service: string;
    urgency: boolean;
  };
  setFormData: (data: any) => void;
}

const ConsultationTypeStep = ({
  formData,
  setFormData,
}: ConsultationTypeStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Type de consultation</h3>
      <Tabs defaultValue="cabinet" onValueChange={(value) => 
        setFormData({ ...formData, consultationType: value })
      }>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cabinet">
            <User className="mr-2 h-4 w-4" />
            En cabinet
          </TabsTrigger>
          <TabsTrigger value="teleconsultation">
            <Video className="mr-2 h-4 w-4" />
            Téléconsultation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cabinet">
          <Card>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label>Spécialité</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => 
                    setFormData({ ...formData, service: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="generaliste">Médecine générale</SelectItem>
                    <SelectItem value="cardiologie">Cardiologie</SelectItem>
                    <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                    <SelectItem value="dermatologie">Dermatologie</SelectItem>
                    <SelectItem value="ophtalmologie">Ophtalmologie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="urgency"
                  checked={formData.urgency}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, urgency: checked })
                  }
                />
                <Label htmlFor="urgency">Consultation urgente</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teleconsultation">
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-500">
                La téléconsultation se fera via notre plateforme sécurisée. 
                Vous recevrez un lien de connexion par email avant la consultation.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsultationTypeStep;