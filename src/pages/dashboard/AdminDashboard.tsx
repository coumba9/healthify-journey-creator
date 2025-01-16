import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStats from "@/components/dashboard/stats/DashboardStats";
import AdminSection from "@/components/services/AdminSection";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
          <div className="text-sm text-muted-foreground">
            Dernière mise à jour: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Statistiques et graphiques */}
        <DashboardStats />

        {/* Section administrative */}
        <AdminSection />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;