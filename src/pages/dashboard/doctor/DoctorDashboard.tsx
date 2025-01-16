import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStats from "@/components/dashboard/stats/DashboardStats";
import AppointmentList from "@/components/dashboard/appointments/AppointmentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const DoctorDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tableau de bord Médecin</h1>
          <span className="text-gray-500">
            Bienvenue, Dr. {user?.name || user?.email}
          </span>
        </div>

        <DashboardStats />

        <Card>
          <CardHeader>
            <CardTitle>Rendez-vous à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;