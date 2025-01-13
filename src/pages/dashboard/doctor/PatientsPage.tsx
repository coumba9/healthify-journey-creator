import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const PatientsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mes Patients</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher un patient..."
                className="pl-8"
              />
            </div>
            <Button>Ajouter un patient</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Jean Dupont",
                  age: 45,
                  lastVisit: "15/03/2024",
                  nextVisit: "22/04/2024",
                },
                {
                  name: "Marie Martin",
                  age: 32,
                  lastVisit: "10/03/2024",
                  nextVisit: "17/04/2024",
                },
                {
                  name: "Pierre Durant",
                  age: 28,
                  lastVisit: "05/03/2024",
                  nextVisit: "12/04/2024",
                },
              ].map((patient, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-600">
                      {patient.age} ans - Dernière visite: {patient.lastVisit}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Dossier médical
                    </Button>
                    <Button size="sm">
                      Prendre RDV
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PatientsPage;