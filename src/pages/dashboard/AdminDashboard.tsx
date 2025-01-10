import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord Administrateur</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Total des utilisateurs: 0</p>
              <p className="text-gray-600">Nouveaux utilisateurs: 0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Total des rendez-vous: 0</p>
              <p className="text-gray-600">Rendez-vous aujourd'hui: 0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Médecins</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Total des médecins: 0</p>
              <p className="text-gray-600">Médecins actifs: 0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Système</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">État du système: Opérationnel</p>
              <p className="text-gray-600">Dernière mise à jour: Aujourd'hui</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;