import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

const DocumentsPage = () => {
  const documents = [
    { id: 1, name: "Ordonnance 12/03/2024", type: "Ordonnance", date: "12/03/2024" },
    { id: 2, name: "Résultats analyses", type: "Analyses", date: "10/03/2024" },
    { id: 3, name: "Certificat médical", type: "Certificat", date: "05/03/2024" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Mes Documents</h1>
        
        <div className="grid gap-6">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-primary-500" />
                  <div>
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-gray-500">
                      {doc.type} - {doc.date}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
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