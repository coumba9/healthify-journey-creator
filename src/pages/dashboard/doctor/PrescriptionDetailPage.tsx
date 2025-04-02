
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Printer, Download, ArrowLeft, Share2, PenTool } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignaturePad from "@/components/prescriptions/SignaturePad";

const PrescriptionDetailPage = () => {
  const { prescriptionId } = useParams<{ prescriptionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [prescription, setPrescription] = useState<any>(null);

  useEffect(() => {
    // Dans une implémentation réelle, nous récupérerions les données depuis l'API
    const fetchPrescription = async () => {
      setIsLoading(true);
      try {
        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées
        setPrescription({
          id: prescriptionId,
          patientName: "Jean Dupont",
          date: "2024-03-15",
          doctorName: "Dr. Martin Lefebvre",
          medications: [
            "Paracétamol 1000mg - 1 comprimé 3 fois par jour pendant 5 jours",
            "Ibuprofène 400mg - 1 comprimé matin et soir pendant 3 jours"
          ],
          status: "active",
          signed: true,
          signatureDate: "2024-03-15"
        });
      } catch (error) {
        console.error("Erreur lors du chargement de l'ordonnance:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de l'ordonnance.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescription();
  }, [prescriptionId, toast]);

  const handleSaveSignature = (signatureData: string) => {
    // Dans une implémentation réelle, nous enregistrerions la signature
    setPrescription(prev => ({
      ...prev,
      signed: true,
      signatureDate: new Date().toISOString().split('T')[0]
    }));
    
    toast({
      title: "Ordonnance signée",
      description: "L'ordonnance a été signée avec succès.",
    });
    
    setIsSignatureDialogOpen(false);
  };

  const handlePrint = () => {
    toast({
      title: "Impression",
      description: "L'ordonnance est en cours d'impression.",
    });
    // Dans une implémentation réelle, nous utiliserions window.print() ou une bibliothèque d'impression
  };

  const handleShare = () => {
    toast({
      title: "Partage",
      description: "Un lien sécurisé a été envoyé au patient.",
    });
    // Dans une implémentation réelle, nous enverrions un email/SMS au patient
  };

  const handleDownload = () => {
    toast({
      title: "Téléchargement",
      description: "L'ordonnance est en cours de téléchargement.",
    });
    // Dans une implémentation réelle, nous générerions un PDF
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-lg">Chargement de l'ordonnance...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!prescription) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Ordonnance non trouvée</h2>
          <p className="mb-6">L'ordonnance demandée n'existe pas ou a été supprimée.</p>
          <Button onClick={() => navigate("/dashboard/doctor/prescriptions")}>
            Retour à la liste des ordonnances
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard/doctor/prescriptions")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold">Détails de l'ordonnance</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Ordonnance médicale</CardTitle>
                <p className="text-gray-500 mt-1">
                  Référence: #{prescription.id}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{prescription.doctorName}</p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(prescription.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Patient</h3>
              <p className="text-lg font-medium">{prescription.patientName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Médicaments prescrits</h3>
              <ul className="space-y-2">
                {prescription.medications.map((med: string, index: number) => (
                  <li key={index} className="p-3 bg-gray-50 rounded-md">
                    {med}
                  </li>
                ))}
              </ul>
            </div>

            {prescription.signed ? (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Signature du médecin</h3>
                <div className="p-3 bg-gray-50 rounded-md flex items-center justify-between">
                  <p className="text-green-600 font-medium">Signé électroniquement</p>
                  <p className="text-sm text-gray-500">
                    le {new Date(prescription.signatureDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-yellow-50 rounded-md text-center">
                <p className="text-yellow-600">Cette ordonnance n'a pas encore été signée</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => setIsSignatureDialogOpen(true)}
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Signer maintenant
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t bg-gray-50 flex justify-between">
            <p className="text-sm text-gray-500">
              Cette ordonnance est valable jusqu'au {new Date(new Date(prescription.date).setMonth(new Date(prescription.date).getMonth() + 3)).toLocaleDateString()}
            </p>
            {prescription.signed && (
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Envoyer au patient
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Signer l'ordonnance</DialogTitle>
          </DialogHeader>
          <SignaturePad onSave={handleSaveSignature} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PrescriptionDetailPage;
