import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSection = () => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold">Espace Administrateur</h3>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Gérer les comptes utilisateurs...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gestion des services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Gérer les services médicaux...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rapports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Accès aux rapports d'activité...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Paramètres de l'application...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSection;