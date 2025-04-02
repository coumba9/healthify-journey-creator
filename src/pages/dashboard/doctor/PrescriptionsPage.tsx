
import { useState } from "react";
import { FileText, Search, Download, Plus, PenTool, Printer, FileCheck, X, Share2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import SignaturePad from "@/components/prescriptions/SignaturePad";

interface Prescription {
  id: string;
  date: string;
  patientName: string;
  medications: string[];
  status: "active" | "expired" | "pending";
  signed: boolean;
}

const PrescriptionsPage = () => {
  const { toast } = useToast();
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);
  const [prescriptionText, setPrescriptionText] = useState("");
  const [patientName, setPatientName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Exemple de données d'ordonnances (à remplacer par une vraie API)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "1",
      date: "2024-03-10",
      patientName: "Jean Dupont",
      medications: ["Paracétamol 1000mg - 1 comprimé 3 fois par jour pendant 5 jours", "Ibuprofène 400mg - 1 comprimé matin et soir pendant 3 jours"],
      status: "active",
      signed: true,
    },
    {
      id: "2",
      date: "2024-02-15",
      patientName: "Marie Martin",
      medications: ["Amoxicilline 500mg - 1 comprimé matin, midi et soir pendant 7 jours"],
      status: "expired",
      signed: true,
    },
    {
      id: "3",
      date: "2024-03-20",
      patientName: "Pierre Durand",
      medications: ["Ventoline - 2 bouffées 3 fois par jour au besoin", "Cortisone 20mg - 1 comprimé par jour pendant 5 jours"],
      status: "pending",
      signed: false,
    },
  ]);

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSignature = (prescriptionId: string) => {
    setSelectedPrescription(prescriptionId);
    setIsSignatureDialogOpen(true);
  };

  const handleSaveSignature = (signatureData: string) => {
    // Dans une implémentation réelle, nous sauvegarderions la signature dans la base de données
    setPrescriptions(
      prescriptions.map((p) =>
        p.id === selectedPrescription ? { ...p, signed: true } : p
      )
    );
    
    toast({
      title: "Ordonnance signée",
      description: "L'ordonnance a été signée avec succès.",
    });
    
    setIsSignatureDialogOpen(false);
    setSelectedPrescription(null);
  };

  const handleCreatePrescription = () => {
    if (!prescriptionText.trim() || !patientName.trim()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive",
      });
      return;
    }

    // Créer une nouvelle ordonnance
    const newPrescription: Prescription = {
      id: (prescriptions.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      patientName: patientName,
      medications: prescriptionText.split('\n').filter(med => med.trim() !== ''),
      status: "pending",
      signed: false,
    };

    setPrescriptions([newPrescription, ...prescriptions]);
    
    toast({
      title: "Ordonnance créée",
      description: "L'ordonnance a été créée avec succès. Veuillez la signer.",
    });
    
    setPrescriptionText("");
    setPatientName("");
    setIsPrescriptionDialogOpen(false);
  };

  const handlePrintPrescription = (id: string) => {
    toast({
      title: "Impression en cours",
      description: "L'ordonnance est en cours d'impression.",
    });
    // Dans une implémentation réelle, nous utiliserions une bibliothèque comme html2pdf.js
  };

  const handleSharePrescription = (id: string) => {
    toast({
      title: "Partage d'ordonnance",
      description: "Un lien sécurisé a été généré et envoyé au patient.",
    });
    // Dans une implémentation réelle, nous enverrions un email ou SMS au patient
  };

  const handleViewPrescription = (id: string) => {
    // Trouver l'ordonnance à afficher
    const prescription = prescriptions.find(p => p.id === id);
    if (prescription) {
      setPrescriptionText(prescription.medications.join('\n'));
      setPatientName(prescription.patientName);
      // En lecture seule, pas d'édition possible
      setIsPrescriptionDialogOpen(true);
    }
  };

  const handleDeletePrescription = (id: string) => {
    // Supprimer l'ordonnance
    setPrescriptions(prescriptions.filter(p => p.id !== id));
    toast({
      title: "Ordonnance supprimée",
      description: "L'ordonnance a été supprimée avec succès.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Gestion des Ordonnances</h1>
          <FileText className="h-6 w-6 text-gray-500" />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un patient..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle ordonnance
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle ordonnance</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour créer une ordonnance pour votre patient.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="patient-name" className="text-sm font-medium">
                      Nom du patient
                    </label>
                    <Input
                      id="patient-name"
                      placeholder="Nom complet du patient"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="prescription-text" className="text-sm font-medium">
                      Prescription (un médicament par ligne)
                    </label>
                    <Textarea
                      id="prescription-text"
                      placeholder="Ex: Paracétamol 1000mg - 1 comprimé 3 fois par jour pendant 5 jours"
                      value={prescriptionText}
                      onChange={(e) => setPrescriptionText(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPrescriptionDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreatePrescription}>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Créer l'ordonnance
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter les ordonnances
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Médicaments</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.length > 0 ? (
                filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>
                      {new Date(prescription.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{prescription.patientName}</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside">
                        {prescription.medications.slice(0, 2).map((med, index) => (
                          <li key={index} className="truncate max-w-xs">
                            {med}
                          </li>
                        ))}
                        {prescription.medications.length > 2 && (
                          <li className="text-gray-500">
                            +{prescription.medications.length - 2} autres médicaments
                          </li>
                        )}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          prescription.status === "active"
                            ? "bg-green-100 text-green-800"
                            : prescription.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {prescription.status === "active"
                          ? "Active"
                          : prescription.status === "pending"
                          ? "En attente"
                          : "Expirée"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewPrescription(prescription.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {!prescription.signed && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSignature(prescription.id)}
                          >
                            <PenTool className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handlePrintPrescription(prescription.id)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSharePrescription(prescription.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDeletePrescription(prescription.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    Aucune ordonnance trouvée. Cliquez sur "Nouvelle ordonnance" pour en créer une.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Signer l'ordonnance</DialogTitle>
              <DialogDescription>
                Veuillez signer ci-dessous pour valider l'ordonnance
              </DialogDescription>
            </DialogHeader>
            <SignaturePad onSave={handleSaveSignature} />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PrescriptionsPage;
