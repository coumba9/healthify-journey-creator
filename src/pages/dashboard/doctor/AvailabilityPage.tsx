
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Plus, X, Calendar as CalendarIcon, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const AvailabilityPage = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availabilities, setAvailabilities] = useState([
    { id: 1, day: "Lundi", start: "09:00", end: "17:00" },
    { id: 2, day: "Mardi", start: "09:00", end: "17:00" },
  ]);
  const [unavailabilities, setUnavailabilities] = useState([
    { id: 1, date: "2024-04-15", reason: "Formation médicale" },
  ]);
  const [leaves, setLeaves] = useState([
    { id: 1, startDate: "2024-07-01", endDate: "2024-07-15", type: "Congés annuels" },
  ]);
  
  // Formulaire pour ajouter une nouvelle disponibilité
  const [showAddAvailabilityDialog, setShowAddAvailabilityDialog] = useState(false);
  const [newAvailability, setNewAvailability] = useState({
    day: "Lundi",
    start: "09:00",
    end: "17:00",
  });

  // Formulaire pour ajouter une indisponibilité
  const [showAddUnavailabilityDialog, setShowAddUnavailabilityDialog] = useState(false);
  const [newUnavailability, setNewUnavailability] = useState({
    date: "",
    reason: "",
  });

  // Formulaire pour ajouter un congé
  const [showAddLeaveDialog, setShowAddLeaveDialog] = useState(false);
  const [newLeave, setNewLeave] = useState({
    startDate: "",
    endDate: "",
    type: "Congés annuels",
  });

  const handleAddAvailability = () => {
    const id = availabilities.length + 1;
    setAvailabilities([...availabilities, { id, ...newAvailability }]);
    setShowAddAvailabilityDialog(false);
    toast({
      title: "Disponibilité ajoutée",
      description: "Votre nouvelle disponibilité a été enregistrée.",
    });
  };

  const handleAddUnavailability = () => {
    const id = unavailabilities.length + 1;
    setUnavailabilities([...unavailabilities, { id, ...newUnavailability }]);
    setShowAddUnavailabilityDialog(false);
    toast({
      title: "Indisponibilité ajoutée",
      description: "Votre indisponibilité a été enregistrée.",
    });
  };

  const handleAddLeave = () => {
    const id = leaves.length + 1;
    setLeaves([...leaves, { id, ...newLeave }]);
    setShowAddLeaveDialog(false);
    toast({
      title: "Congé ajouté",
      description: "Votre période de congé a été enregistrée.",
    });
  };

  const handleRemoveAvailability = (id: number) => {
    setAvailabilities(availabilities.filter((a) => a.id !== id));
    toast({
      title: "Disponibilité supprimée",
      description: "La disponibilité a été supprimée avec succès.",
    });
  };

  const handleRemoveUnavailability = (id: number) => {
    setUnavailabilities(unavailabilities.filter((u) => u.id !== id));
    toast({
      title: "Indisponibilité supprimée",
      description: "L'indisponibilité a été supprimée avec succès.",
    });
  };

  const handleRemoveLeave = (id: number) => {
    setLeaves(leaves.filter((l) => l.id !== id));
    toast({
      title: "Congé supprimé",
      description: "La période de congé a été supprimée avec succès.",
    });
  };

  const daysOfWeek = [
    "Lundi", 
    "Mardi", 
    "Mercredi", 
    "Jeudi", 
    "Vendredi", 
    "Samedi", 
    "Dimanche"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gérer mes disponibilités</h1>
        
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Disponibilités hebdomadaires</TabsTrigger>
            <TabsTrigger value="unavailable">Indisponibilités</TabsTrigger>
            <TabsTrigger value="leaves">Congés</TabsTrigger>
          </TabsList>
          
          {/* Tab pour les disponibilités hebdomadaires */}
          <TabsContent value="weekly" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Horaires hebdomadaires</h2>
              <Dialog open={showAddAvailabilityDialog} onOpenChange={setShowAddAvailabilityDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une disponibilité
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter une disponibilité</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Jour</label>
                      <Select
                        value={newAvailability.day}
                        onValueChange={(value) => setNewAvailability({...newAvailability, day: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un jour" />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Heure de début</label>
                      <Input
                        type="time"
                        value={newAvailability.start}
                        onChange={(e) => setNewAvailability({...newAvailability, start: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Heure de fin</label>
                      <Input
                        type="time"
                        value={newAvailability.end}
                        onChange={(e) => setNewAvailability({...newAvailability, end: e.target.value})}
                      />
                    </div>
                    <Button className="w-full" onClick={handleAddAvailability}>
                      Ajouter
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {availabilities.map((availability) => (
                <div
                  key={availability.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {availability.day} : {availability.start} - {availability.end}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAvailability(availability.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Tab pour les indisponibilités */}
          <TabsContent value="unavailable" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Jours d'indisponibilité</h2>
              <Dialog open={showAddUnavailabilityDialog} onOpenChange={setShowAddUnavailabilityDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Ban className="h-4 w-4 mr-2" />
                    Ajouter une indisponibilité
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter une indisponibilité</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <Input
                        type="date"
                        value={newUnavailability.date}
                        onChange={(e) => setNewUnavailability({...newUnavailability, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Motif</label>
                      <Input
                        type="text"
                        value={newUnavailability.reason}
                        onChange={(e) => setNewUnavailability({...newUnavailability, reason: e.target.value})}
                        placeholder="Ex: Formation, réunion..."
                      />
                    </div>
                    <Button className="w-full" onClick={handleAddUnavailability}>
                      Confirmer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {unavailabilities.map((unavailability) => (
                <div
                  key={unavailability.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center">
                    <Ban className="h-4 w-4 mr-2 text-red-500" />
                    <div>
                      <span className="font-medium">
                        {new Date(unavailability.date).toLocaleDateString('fr-FR')}
                      </span>
                      <p className="text-sm text-gray-500">{unavailability.reason}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveUnavailability(unavailability.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Tab pour les congés */}
          <TabsContent value="leaves" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Périodes de congés</h2>
              <Dialog open={showAddLeaveDialog} onOpenChange={setShowAddLeaveDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Ajouter un congé
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter une période de congé</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date de début</label>
                      <Input
                        type="date"
                        value={newLeave.startDate}
                        onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date de fin</label>
                      <Input
                        type="date"
                        value={newLeave.endDate}
                        onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Type de congé</label>
                      <Select
                        value={newLeave.type}
                        onValueChange={(value) => setNewLeave({...newLeave, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Congés annuels">Congés annuels</SelectItem>
                          <SelectItem value="Congé maladie">Congé maladie</SelectItem>
                          <SelectItem value="Formation">Formation</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={handleAddLeave}>
                      Confirmer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {leaves.map((leave) => (
                <div
                  key={leave.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <div>
                      <span className="font-medium">
                        Du {new Date(leave.startDate).toLocaleDateString('fr-FR')} au {new Date(leave.endDate).toLocaleDateString('fr-FR')}
                      </span>
                      <p className="text-sm">
                        <Badge>{leave.type}</Badge>
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLeave(leave.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Visualisation du calendrier */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Légende :</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-300 rounded-full mr-1"></div>
                  <span className="text-sm">Disponible</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-300 rounded-full mr-1"></div>
                  <span className="text-sm">Indisponible</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-300 rounded-full mr-1"></div>
                  <span className="text-sm">Congé</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AvailabilityPage;
