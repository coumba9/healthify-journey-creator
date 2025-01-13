import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SchedulePage = () => {
  const { toast } = useToast();

  const handleAddAppointment = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "L'ajout de rendez-vous sera bientôt disponible",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Planning</h1>
          <Button onClick={handleAddAppointment}>Ajouter un rendez-vous</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rendez-vous du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "09:00", patient: "Jean Dupont", type: "Consultation" },
                  { time: "10:30", patient: "Marie Martin", type: "Suivi" },
                  { time: "14:00", patient: "Pierre Durant", type: "Contrôle" },
                ].map((appointment, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">
                        {appointment.time} - {appointment.type}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Voir détails
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

export default SchedulePage;