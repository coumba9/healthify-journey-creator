import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Download, Trash2 } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

const DocumentManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Exemple de documents (à remplacer par des vraies données plus tard)
  const documents: Document[] = [
    {
      id: "1",
      name: "Résultats analyses.pdf",
      type: "PDF",
      size: "2.5 MB",
      uploadedAt: "2024-03-15",
      uploadedBy: "Dr. Smith",
    },
    {
      id: "2",
      name: "Ordonnance.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadedAt: "2024-03-14",
      uploadedBy: "Dr. Johnson",
    },
  ];

  const handleUpload = () => {
    toast({
      title: "Upload en cours",
      description: "Le document est en cours d'upload...",
    });
  };

  const handleDownload = (documentId: string) => {
    toast({
      title: "Téléchargement",
      description: "Le document est en cours de téléchargement...",
    });
  };

  const handleDelete = (documentId: string) => {
    toast({
      title: "Suppression",
      description: "Le document a été supprimé avec succès.",
    });
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Rechercher un document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        <Button onClick={handleUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-white"
          >
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium">{doc.name}</h3>
                <p className="text-sm text-gray-500">
                  {doc.type} • {doc.size} • Uploadé le {doc.uploadedAt} par{" "}
                  {doc.uploadedBy}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(doc.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(doc.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentManager;