import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord Administrateur</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques Globales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-600">Total Utilisateurs</p>
                <p className="text-2xl font-bold">150</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-600">Rendez-vous Aujourd'hui</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-600">Médecins Actifs</p>
                <p className="text-2xl font-bold">10</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-600">Nouveaux Patients</p>
                <p className="text-2xl font-bold">25</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Cardiologie", "Pédiatrie", "Neurologie"].map((service) => (
                <div
                  key={service}
                  className="flex justify-between items-center p-4 border rounded"
                >
                  <span>{service}</span>
                  <Button variant="outline" size="sm">
                    Gérer
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dernières Activités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Nouveau médecin inscrit",
                "Mise à jour du planning",
                "Maintenance système",
              ].map((activity, index) => (
                <div key={index} className="p-4 border rounded">
                  <p className="font-medium">{activity}</p>
                  <p className="text-sm text-gray-600">Il y a 2 heures</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Sauvegardes",
                "Notifications",
                "Paramètres de sécurité",
              ].map((setting, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded"
                >
                  <span>{setting}</span>
                  <Button variant="outline" size="sm">
                    Configurer
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;