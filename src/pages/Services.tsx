import ServicesSection from "@/components/home/Services";
import PatientSection from "@/components/services/PatientSection";
import DoctorSection from "@/components/services/DoctorSection";
import AdminSection from "@/components/services/AdminSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ServicesSection />
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Espace Utilisateurs
            </h2>
            <Tabs defaultValue="patient" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patient">Patients</TabsTrigger>
                <TabsTrigger value="doctor">Médecins</TabsTrigger>
                <TabsTrigger value="admin">Administrateurs</TabsTrigger>
              </TabsList>
              <TabsContent value="patient">
                <PatientSection />
              </TabsContent>
              <TabsContent value="doctor">
                <DoctorSection />
              </TabsContent>
              <TabsContent value="admin">
                <AdminSection />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;