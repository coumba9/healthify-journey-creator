import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Video, Upload, Clock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const NewAppointmentForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [createAccount, setCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    // Patient info
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    forSomeoneElse: false,
    beneficiaryName: "",
    
    // Appointment details
    date: "",
    time: "",
    service: "",
    consultationType: "cabinet",
    urgency: false,
    reason: "",
    symptoms: "",
    
    // Medical info
    allergies: "",
    currentMedications: "",
    documents: [] as File[],
    
    // Insurance
    insurance: "",
    insuranceNumber: "",
    
    // Reminders
    emailReminder: true,
    smsReminder: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment data:", formData);
    toast({
      title: "Rendez-vous programmé",
      description: "Nous vous contacterons pour confirmer votre rendez-vous.",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations du patient</h3>
            {!user && (
              <div className="space-y-4">
                <Input
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="createAccount"
                    checked={createAccount}
                    onCheckedChange={(checked) => setCreateAccount(checked as boolean)}
                  />
                  <label htmlFor="createAccount">
                    Créer un compte pour gérer mes rendez-vous
                  </label>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="forSomeoneElse"
                checked={formData.forSomeoneElse}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, forSomeoneElse: checked as boolean })
                }
              />
              <label htmlFor="forSomeoneElse">
                Prendre rendez-vous pour quelqu'un d'autre
              </label>
            </div>
            
            {formData.forSomeoneElse && (
              <Input
                placeholder="Nom du bénéficiaire"
                value={formData.beneficiaryName}
                onChange={(e) => 
                  setFormData({ ...formData, beneficiaryName: e.target.value })
                }
              />
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Type de consultation</h3>
            <Tabs defaultValue="cabinet">
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
                  <CardContent className="pt-4">
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
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="teleconsultation">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-500">
                      La téléconsultation se fera via notre plateforme sécurisée
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Date et heure</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations médicales</h3>
            <Textarea
              placeholder="Motif de consultation"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
            <Textarea
              placeholder="Symptômes actuels"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Documents médicaux</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Glissez vos documents ici ou cliquez pour les sélectionner
                </p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData({ ...formData, documents: files });
                  }}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Prendre un rendez-vous</CardTitle>
        <CardDescription>
          {`Étape ${step}/4 - ${
            step === 1
              ? "Informations personnelles"
              : step === 2
              ? "Type de consultation"
              : step === 3
              ? "Date et heure"
              : "Informations médicales"
          }`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Précédent
              </Button>
            )}
            {step < 4 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto"
              >
                Suivant
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Confirmer le rendez-vous
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewAppointmentForm;