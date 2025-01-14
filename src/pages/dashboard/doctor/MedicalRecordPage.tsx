import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { FileText, Plus } from "lucide-react";

const MedicalRecordPage = () => {
  const { patientId } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dossier Médical</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une note
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations du patient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="font-medium">Jean Dupont</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de naissance</p>
                <p className="font-medium">15/03/1980</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium">06 12 34 56 78</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">jean.dupont@email.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique médical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Consultation {item}</span>
                    </div>
                    <span className="text-sm text-gray-500">15/03/2024</span>
                  </div>
                  <p className="text-gray-600">
                    Notes de consultation et observations médicales...
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecordPage;