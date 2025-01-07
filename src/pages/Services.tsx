import ServicesSection from "@/components/home/Services";
import AppointmentForm from "@/components/appointment/AppointmentForm";
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
              Prenez rendez-vous avec nos spécialistes
            </h2>
            <AppointmentForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;