import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
import { Calendar, Video } from "lucide-react";

const AppointmentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    consultationType: "cabinet",
    reason: "",
    notes: "",
    insurance: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment data:", formData);
    toast({
      title: "Rendez-vous programmé",
      description: "Nous vous contacterons pour confirmer votre rendez-vous.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      consultationType: "cabinet",
      reason: "",
      notes: "",
      insurance: "",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Prendre un rendez-vous</CardTitle>
        <CardDescription>
          Remplissez le formulaire ci-dessous pour programmer votre consultation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">
                Mutuelle
              </label>
              <Select
                value={formData.insurance}
                onValueChange={(value) => setFormData({ ...formData, insurance: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre mutuelle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mgen">MGEN</SelectItem>
                  <SelectItem value="harmonie">Harmonie Mutuelle</SelectItem>
                  <SelectItem value="maaf">MAAF</SelectItem>
                  <SelectItem value="axa">AXA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date souhaitée
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Heure souhaitée
              </label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiologie">Cardiologie</SelectItem>
                <SelectItem value="neurologie">Neurologie</SelectItem>
                <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                <SelectItem value="generaliste">Médecine générale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="consultationType" className="block text-sm font-medium text-gray-700 mb-1">
              Type de consultation
            </label>
            <Select
              value={formData.consultationType}
              onValueChange={(value) => setFormData({ ...formData, consultationType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type de consultation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cabinet">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    En cabinet
                  </span>
                </SelectItem>
                <SelectItem value="teleconsultation">
                  <span className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Téléconsultation
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Motif de consultation
            </label>
            <Select
              value={formData.reason}
              onValueChange={(value) => setFormData({ ...formData, reason: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le motif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="premiere">Première consultation</SelectItem>
                <SelectItem value="suivi">Suivi</SelectItem>
                <SelectItem value="urgence">Urgence</SelectItem>
                <SelectItem value="controle">Contrôle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes / Symptômes
            </label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full">
            Prendre rendez-vous
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;