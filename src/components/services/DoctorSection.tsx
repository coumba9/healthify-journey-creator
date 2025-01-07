import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

const DoctorSection = () => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold">Espace Médecin</h3>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Planning du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patients du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Liste des rendez-vous du jour...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dossiers patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Accès aux dossiers médicaux...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Statistiques de consultation...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorSection;