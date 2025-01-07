import AboutSection from "@/components/home/About";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;