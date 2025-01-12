import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import AppointmentForm from "@/components/appointment/AppointmentForm";

const PatientDashboard = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `Action ${action}`,
      description: `L'action a été effectuée avec succès.`,
    });
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord Patient</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Prochain rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
            <div className="mt-4 space-x-2">
              <Button onClick={() => handleAction("confirmée")}>Confirmer</Button>
              <Button variant="outline" onClick={() => handleAction("reportée")}>
                Reporter
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleAction("annulée")}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nouveau rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Ordonnance - 15/03/2024</span>
                <Button variant="outline" size="sm">
                  Télécharger
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded">
                <p className="font-medium">Dr. Smith</p>
                <p className="text-sm text-gray-600">
                  Dernier message reçu le 20/03/2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;