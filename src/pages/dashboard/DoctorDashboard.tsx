import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStats from "@/components/dashboard/stats/DashboardStats";

const DoctorDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Tableau de bord Médecin</h1>
        <DashboardStats />
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;