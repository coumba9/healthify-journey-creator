import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleViewDetails = (appointmentId: string) => {
    navigate(`/dashboard/appointments/${appointmentId}`);
  };

  const handleManageAvailability = () => {
    navigate("/dashboard/availability");
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
            <div className="flex justify-between items-center">
              <CardTitle>Patients du jour</CardTitle>
              <Button onClick={handleManageAvailability}>
                Gérer disponibilités
              </Button>
            </div>
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
                  <Button
                    size="sm"
                    onClick={() => handleViewDetails(id.toString())}
                  >
                    Voir détails
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;