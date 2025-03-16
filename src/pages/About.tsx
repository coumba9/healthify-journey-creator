
import AboutSection from "@/components/home/About";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { BackButton } from "@/components/ui/back-button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <BackButton />
          <AboutSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
