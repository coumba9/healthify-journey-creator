import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PatientProfile from "@/components/dashboard/profile/PatientProfile";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mon Profil</h1>
        <PatientProfile />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;