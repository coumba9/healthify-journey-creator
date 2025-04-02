
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CalendarClock, Clock, CalendarX, CalendarDays, Calendar as CalendarIcon } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Types pour les disponibilités
interface TimeSlot {
  start: string;
  end: string;
}

interface WeeklyAvailability {
  day: string;
  slots: TimeSlot[];
  active: boolean;
}

interface Leave {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

// Jours de la semaine en français
const weekDays = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche"
];

const AvailabilityPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("weekly");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  
  // États pour les disponibilités hebdomadaires
  const [weeklyAvailability, setWeeklyAvailability] = useState<WeeklyAvailability[]>(
    weekDays.map(day => ({
      day,
      slots: [{ start: "09:00", end: "17:00" }],
      active: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].includes(day)
    }))
  );
  
  // États pour les indisponibilités ponctuelles
  const [unavailableDate, setUnavailableDate] = useState<Date | undefined>(undefined);
  const [unavailableTimeStart, setUnavailableTimeStart] = useState("09:00");
  const [unavailableTimeEnd, setUnavailableTimeEnd] = useState("17:00");
  const [unavailableDates, setUnavailableDates] = useState<{date: Date, start: string, end: string}[]>([]);
  
  // États pour les congés
  const [leaveStartDate, setLeaveStartDate] = useState<Date | undefined>(undefined);
  const [leaveEndDate, setLeaveEndDate] = useState<Date | undefined>(undefined);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaves, setLeaves] = useState<Leave[]>([]);

  // Fonction pour ajouter un créneau à un jour
  const addTimeSlot = (dayIndex: number) => {
    const updatedAvailability = [...weeklyAvailability];
    updatedAvailability[dayIndex].slots.push({ start: "09:00", end: "17:00" });
    setWeeklyAvailability(updatedAvailability);
  };

  // Fonction pour supprimer un créneau
  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedAvailability = [...weeklyAvailability];
    updatedAvailability[dayIndex].slots.splice(slotIndex, 1);
    setWeeklyAvailability(updatedAvailability);
  };

  // Fonction pour mettre à jour un créneau
  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: "start" | "end", value: string) => {
    const updatedAvailability = [...weeklyAvailability];
    updatedAvailability[dayIndex].slots[slotIndex][field] = value;
    setWeeklyAvailability(updatedAvailability);
  };

  // Fonction pour activer/désactiver un jour
  const toggleDay = (dayIndex: number) => {
    const updatedAvailability = [...weeklyAvailability];
    updatedAvailability[dayIndex].active = !updatedAvailability[dayIndex].active;
    setWeeklyAvailability(updatedAvailability);
  };

  // Fonction pour sauvegarder les disponibilités
  const saveWeeklyAvailability = () => {
    // Ici, vous pourriez envoyer les données à votre API
    console.log("Disponibilités hebdomadaires:", weeklyAvailability);
    toast({
      title: "Disponibilités enregistrées",
      description: "Vos disponibilités hebdomadaires ont été mises à jour."
    });
  };

  // Fonction pour ajouter une indisponibilité ponctuelle
  const addUnavailableDate = () => {
    if (!unavailableDate) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date",
        variant: "destructive"
      });
      return;
    }

    // Vérifier si l'heure de fin est après l'heure de début
    if (unavailableTimeStart >= unavailableTimeEnd) {
      toast({
        title: "Erreur",
        description: "L'heure de fin doit être après l'heure de début",
        variant: "destructive"
      });
      return;
    }

    setUnavailableDates([
      ...unavailableDates,
      { date: unavailableDate, start: unavailableTimeStart, end: unavailableTimeEnd }
    ]);
    setUnavailableDate(undefined);
    setUnavailableTimeStart("09:00");
    setUnavailableTimeEnd("17:00");
    
    toast({
      title: "Indisponibilité ajoutée",
      description: `Vous êtes indisponible le ${format(unavailableDate, 'dd/MM/yyyy')} de ${unavailableTimeStart} à ${unavailableTimeEnd}`
    });
  };

  // Fonction pour supprimer une indisponibilité
  const removeUnavailableDate = (index: number) => {
    const updatedDates = [...unavailableDates];
    updatedDates.splice(index, 1);
    setUnavailableDates(updatedDates);
    
    toast({
      title: "Indisponibilité supprimée",
      description: "L'indisponibilité a été supprimée"
    });
  };

  // Fonction pour ajouter un congé
  const addLeave = () => {
    if (!leaveStartDate || !leaveEndDate) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner les dates de début et de fin",
        variant: "destructive"
      });
      return;
    }

    if (leaveStartDate > leaveEndDate) {
      toast({
        title: "Erreur",
        description: "La date de début doit être avant la date de fin",
        variant: "destructive"
      });
      return;
    }

    const newLeave = {
      id: Date.now().toString(),
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason: leaveReason || "Congé"
    };

    setLeaves([...leaves, newLeave]);
    setLeaveStartDate(undefined);
    setLeaveEndDate(undefined);
    setLeaveReason("");
    
    toast({
      title: "Congé ajouté",
      description: `Congé ajouté du ${format(leaveStartDate, 'dd/MM/yyyy')} au ${format(leaveEndDate, 'dd/MM/yyyy')}`
    });
  };

  // Fonction pour supprimer un congé
  const removeLeave = (id: string) => {
    setLeaves(leaves.filter(leave => leave.id !== id));
    
    toast({
      title: "Congé supprimé",
      description: "Le congé a été supprimé"
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des disponibilités</h1>
        </div>

        <Tabs defaultValue="weekly" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Disponibilités hebdomadaires
            </TabsTrigger>
            <TabsTrigger value="unavailable" className="flex items-center gap-2">
              <CalendarX className="h-4 w-4" />
              Indisponibilités ponctuelles
            </TabsTrigger>
            <TabsTrigger value="leave" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Congés
            </TabsTrigger>
          </TabsList>

          {/* Onglet des disponibilités hebdomadaires */}
          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Définir vos disponibilités hebdomadaires</CardTitle>
                <CardDescription>
                  Configurez vos horaires de disponibilité pour chaque jour de la semaine.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {weeklyAvailability.map((dayConfig, dayIndex) => (
                  <div key={dayConfig.day} className="mb-6 p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id={`day-${dayIndex}`} 
                          checked={dayConfig.active}
                          onCheckedChange={() => toggleDay(dayIndex)}
                        />
                        <Label htmlFor={`day-${dayIndex}`} className="font-medium">
                          {dayConfig.day}
                        </Label>
                      </div>
                      {dayConfig.active && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addTimeSlot(dayIndex)}
                        >
                          Ajouter un créneau
                        </Button>
                      )}
                    </div>

                    {dayConfig.active && (
                      <div className="space-y-3">
                        {dayConfig.slots.map((slot, slotIndex) => (
                          <div key={slotIndex} className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>De</span>
                            </div>
                            <Input
                              type="time"
                              value={slot.start}
                              onChange={(e) => updateTimeSlot(dayIndex, slotIndex, "start", e.target.value)}
                              className="w-32"
                            />
                            <span>à</span>
                            <Input
                              type="time"
                              value={slot.end}
                              onChange={(e) => updateTimeSlot(dayIndex, slotIndex, "end", e.target.value)}
                              className="w-32"
                            />
                            {dayConfig.slots.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                                className="text-red-500"
                              >
                                Supprimer
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Button onClick={saveWeeklyAvailability} className="mt-4">
                  Enregistrer les disponibilités
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet des indisponibilités ponctuelles */}
          <TabsContent value="unavailable">
            <Card>
              <CardHeader>
                <CardTitle>Définir des indisponibilités ponctuelles</CardTitle>
                <CardDescription>
                  Ajoutez des périodes d'indisponibilité pour des dates spécifiques.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="unavailable-date">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full mt-1 justify-start">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {unavailableDate ? format(unavailableDate, 'dd/MM/yyyy') : "Sélectionner une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={unavailableDate}
                              onSelect={setUnavailableDate}
                              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="unavailable-start">Heure de début</Label>
                          <Input
                            id="unavailable-start"
                            type="time"
                            value={unavailableTimeStart}
                            onChange={(e) => setUnavailableTimeStart(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="unavailable-end">Heure de fin</Label>
                          <Input
                            id="unavailable-end"
                            type="time"
                            value={unavailableTimeEnd}
                            onChange={(e) => setUnavailableTimeEnd(e.target.value)}
                          />
                        </div>
                      </div>

                      <Button onClick={addUnavailableDate} className="w-full">
                        Ajouter cette indisponibilité
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Indisponibilités planifiées</h3>
                    {unavailableDates.length === 0 ? (
                      <p className="text-gray-500">Aucune indisponibilité planifiée</p>
                    ) : (
                      <div className="space-y-2">
                        {unavailableDates.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{format(item.date, 'dd/MM/yyyy')}</p>
                              <p className="text-sm text-gray-500">
                                De {item.start} à {item.end}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeUnavailableDate(index)}
                              className="text-red-500"
                            >
                              Supprimer
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet des congés */}
          <TabsContent value="leave">
            <Card>
              <CardHeader>
                <CardTitle>Planifier des congés</CardTitle>
                <CardDescription>
                  Définissez des périodes de congé pendant lesquelles vous ne serez pas disponible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="leave-start">Date de début</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full mt-1 justify-start">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {leaveStartDate ? format(leaveStartDate, 'dd/MM/yyyy') : "Sélectionner une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={leaveStartDate}
                              onSelect={setLeaveStartDate}
                              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label htmlFor="leave-end">Date de fin</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full mt-1 justify-start">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {leaveEndDate ? format(leaveEndDate, 'dd/MM/yyyy') : "Sélectionner une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={leaveEndDate}
                              onSelect={setLeaveEndDate}
                              disabled={(date) => (leaveStartDate ? date < leaveStartDate : date < new Date(new Date().setHours(0,0,0,0)))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label htmlFor="leave-reason">Motif (optionnel)</Label>
                        <Input
                          id="leave-reason"
                          value={leaveReason}
                          onChange={(e) => setLeaveReason(e.target.value)}
                          placeholder="Motif du congé"
                          className="mt-1"
                        />
                      </div>

                      <Button onClick={addLeave} className="w-full">
                        Ajouter ce congé
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Congés planifiés</h3>
                    {leaves.length === 0 ? (
                      <p className="text-gray-500">Aucun congé planifié</p>
                    ) : (
                      <div className="space-y-2">
                        {leaves.map((leave) => (
                          <div key={leave.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{format(leave.startDate, 'dd/MM/yyyy')} - {format(leave.endDate, 'dd/MM/yyyy')}</p>
                              {leave.reason && (
                                <p className="text-sm text-gray-500">
                                  {leave.reason}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLeave(leave.id)}
                              className="text-red-500"
                            >
                              Supprimer
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AvailabilityPage;
