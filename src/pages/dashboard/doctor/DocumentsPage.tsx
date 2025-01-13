import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

const DocumentsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Documents Médicaux</h1>
          <Button>Ajouter un document</Button>
        </div>

        <div className="grid gap-6">
          {[
            {
              title: "Rapport médical - Patient A",
              date: "15/03/2024",
              type: "Rapport",
            },
            {
              title: "Résultats analyses - Patient B",
              date: "14/03/2024",
              type: "Analyses",
            },
            {
              title: "Ordonnance - Patient C",
              date: "13/03/2024",
              type: "Ordonnance",
            },
          ].map((doc, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <p className="text-sm text-gray-600">
                      {doc.type} - {doc.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentsPage;