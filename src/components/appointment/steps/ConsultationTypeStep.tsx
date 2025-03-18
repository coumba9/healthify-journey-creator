
import { User, Video, Monitor, Smartphone, Info } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AppointmentFormData } from "@/hooks/useAppointmentForm";

interface ConsultationTypeStepProps {
  formData: Pick<AppointmentFormData, 'consultationType' | 'service' | 'urgency' | 'teleconsultationDevice' | 'doctorName'>;
  setFormData: (data: any) => void;
}

const ConsultationTypeStep = ({
  formData,
  setFormData,
}: ConsultationTypeStepProps) => {
  // Sample doctor data - in a real application, this would be fetched from an API
  const doctors = {
    generaliste: [
      { id: "doc1", name: "Dr. Martin Dupont" },
      { id: "doc2", name: "Dr. Camille Laurent" },
      { id: "doc3", name: "Dr. Thomas Petit" },
    ],
    cardiologie: [
      { id: "doc4", name: "Dr. Sophie Moreau" },
      { id: "doc5", name: "Dr. Antoine Bernard" },
    ],
    pediatrie: [
      { id: "doc6", name: "Dr. Julie Girard" },
      { id: "doc7", name: "Dr. Michel Blanc" },
    ],
    dermatologie: [
      { id: "doc8", name: "Dr. Emma Dubois" },
      { id: "doc9", name: "Dr. Nicolas Rousseau" },
    ],
    ophtalmologie: [
      { id: "doc10", name: "Dr. Claire Lefebvre" },
      { id: "doc11", name: "Dr. Philippe Martin" },
    ],
    psychologie: [
      { id: "doc12", name: "Dr. Marie Roux" },
      { id: "doc13", name: "Dr. Lucas Fournier" },
    ],
  };

  // Get doctors based on selected service
  const availableDoctors = 
    formData.service && doctors[formData.service as keyof typeof doctors] ? 
    doctors[formData.service as keyof typeof doctors] : 
    [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Type de consultation</h3>
      <Tabs defaultValue={formData.consultationType || "cabinet"} onValueChange={(value) => 
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
                    setFormData({ 
                      ...formData, 
                      service: value,
                      doctorName: "", // Reset doctor when service changes
                      doctorId: "" 
                    })
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

              {formData.service && (
                <div className="space-y-2">
                  <Label>Médecin</Label>
                  <Select
                    value={formData.doctorName}
                    onValueChange={(value) => {
                      const selectedDoctor = availableDoctors.find(doc => doc.name === value);
                      setFormData({ 
                        ...formData, 
                        doctorName: value,
                        doctorId: selectedDoctor?.id || ""
                      });
                    }}
                    disabled={!formData.service}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un médecin" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDoctors.map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
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
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label>Spécialité</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => 
                    setFormData({ 
                      ...formData, 
                      service: value,
                      doctorName: "", // Reset doctor when service changes
                      doctorId: "" 
                    })
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
                    <SelectItem value="psychologie">Psychologie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.service && (
                <div className="space-y-2">
                  <Label>Médecin</Label>
                  <Select
                    value={formData.doctorName}
                    onValueChange={(value) => {
                      const selectedDoctor = availableDoctors.find(doc => doc.name === value);
                      setFormData({ 
                        ...formData, 
                        doctorName: value,
                        doctorId: selectedDoctor?.id || ""
                      });
                    }}
                    disabled={!formData.service}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un médecin" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDoctors.map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Appareil préféré pour la téléconsultation</Label>
                <RadioGroup 
                  value={formData.teleconsultationDevice || "computer"} 
                  onValueChange={(value) => 
                    setFormData({ ...formData, teleconsultationDevice: value })
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="computer" id="computer" />
                    <Label htmlFor="computer" className="flex items-center cursor-pointer">
                      <Monitor className="mr-2 h-4 w-4" />
                      Ordinateur
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center cursor-pointer">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Smartphone/Tablette
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-md">
                <Info className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  La téléconsultation se fera via notre plateforme sécurisée. 
                  Vous recevrez un lien de connexion par email avant la consultation.
                  Assurez-vous d'avoir une connexion Internet stable et un appareil avec caméra et microphone.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsultationTypeStep;
