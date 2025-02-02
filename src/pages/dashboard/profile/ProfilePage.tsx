import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PatientProfile from "@/components/dashboard/profile/PatientProfile";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
        {user?.role === "patient" && <PatientProfile />}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;