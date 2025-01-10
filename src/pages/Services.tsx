import { useAuth } from "@/contexts/AuthContext";
import PatientSection from "@/components/services/PatientSection";
import DoctorSection from "@/components/services/DoctorSection";
import AdminSection from "@/components/services/AdminSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const Services = () => {
  const { user } = useAuth();

  const renderContent = () => {
    switch (user?.role) {
      case "patient":
        return <PatientSection />;
      case "doctor":
        return <DoctorSection />;
      case "admin":
        return <AdminSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {user?.role === "patient"
                ? "Espace Patient"
                : user?.role === "doctor"
                ? "Espace Médecin"
                : "Espace Administrateur"}
            </h2>
            {renderContent()}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;