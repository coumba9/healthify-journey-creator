import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PatientDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord Patient</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Mes Rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucun rendez-vous prévu</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mes Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucun document disponible</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mon Historique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucun historique disponible</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mes Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucune prescription</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;