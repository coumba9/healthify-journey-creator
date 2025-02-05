import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import EmergencyBanner from "@/components/home/EmergencyBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <EmergencyBanner />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;