import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AvailabilityPage = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availabilities, setAvailabilities] = useState([
    { id: 1, day: "Lundi", start: "09:00", end: "17:00" },
    { id: 2, day: "Mardi", start: "09:00", end: "17:00" },
  ]);

  const handleAddAvailability = () => {
    toast({
      title: "Disponibilité ajoutée",
      description: "Votre nouvelle disponibilité a été enregistrée.",
    });
  };

  const handleRemoveAvailability = (id: number) => {
    setAvailabilities(availabilities.filter((a) => a.id !== id));
    toast({
      title: "Disponibilité supprimée",
      description: "La disponibilité a été supprimée avec succès.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gérer mes disponibilités</h1>
          <Button onClick={handleAddAvailability}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une disponibilité
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horaires hebdomadaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AvailabilityPage;