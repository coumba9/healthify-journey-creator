import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `Action ${action}`,
      description: `L'action a été effectuée avec succès.`,
    });
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord Médecin</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Planning du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patients du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((id) => (
                <div
                  key={id}
                  className="p-4 border rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">Patient {id}</p>
                    <p className="text-sm text-gray-600">14:00 - Consultation</p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleAction("consultation démarrée")}
                    >
                      Démarrer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction("reportée")}
                    >
                      Reporter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-600">Consultations aujourd'hui</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-600">Patients en attente</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents à signer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded flex justify-between items-center">
                <div>
                  <p className="font-medium">Ordonnance - Patient 1</p>
                  <p className="text-sm text-gray-600">En attente de signature</p>
                </div>
                <Button size="sm">Signer</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;