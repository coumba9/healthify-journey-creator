
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import VideoConsultation from "@/components/teleconsultation/VideoConsultation";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, User, FileText, ArrowLeft, Download, Upload, 
  FileCheck, PenLine, Printer, Share2
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Simulated medical record data
const patientFiles = [
  { id: "doc1", name: "Résultats d'analyse - Sang", type: "pdf", date: "2024-02-10", category: "analyses" },
  { id: "doc2", name: "Radiographie - Thorax", type: "image", date: "2024-01-15", category: "imagerie" },
  { id: "doc3", name: "Ordonnance - Traitement chronique", type: "pdf", date: "2024-03-01", category: "ordonnances" },
  { id: "doc4", name: "Compte-rendu - Consultation précédente", type: "pdf", date: "2024-02-20", category: "rapports" },
];

const TeleconsultationPage = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDoctor, setIsDoctor] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [consultationNotes, setConsultationNotes] = useState("");
  const [filteredFiles, setFilteredFiles] = useState(patientFiles);
  const [activeFileCategory, setActiveFileCategory] = useState("all");
  const [diagnosisText, setDiagnosisText] = useState("");
  const [prescriptionText, setPrescriptionText] = useState("");

  useEffect(() => {
    // Dans une implémentation réelle, nous récupérerions les détails du rendez-vous depuis l'API
    // Ici, nous simulons des données
    const fetchAppointmentData = async () => {
      setIsLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Vérifier si l'utilisateur est un médecin ou un patient
        const userRole = user?.role || 'patient';
        setIsDoctor(userRole === 'doctor');
        
        // Données simulées pour le rendez-vous
        const mockAppointmentData = {
          id: appointmentId,
          doctorId: "doctor-123",
          doctorName: "Dr. Martin Dupont",
          patientId: "patient-456",
          patientName: "Sophie Lefebvre",
          date: new Date(),
          type: "Téléconsultation",
          status: "confirmed",
          reason: "Suivi médical",
          notes: "Patient souffrant de migraines chroniques",
          medicalHistory: "Hypertension, allergies saisonnières",
          prescriptions: []
        };
        
        setAppointmentData(mockAppointmentData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du rendez-vous.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointmentData();
    }
  }, [appointmentId, user, toast]);

  useEffect(() => {
    if (activeFileCategory === "all") {
      setFilteredFiles(patientFiles);
    } else {
      setFilteredFiles(patientFiles.filter(file => file.category === activeFileCategory));
    }
  }, [activeFileCategory]);

  const handleSaveConsultationNotes = () => {
    // Simuler la sauvegarde des notes
    toast({
      title: "Notes sauvegardées",
      description: "Les notes de consultation ont été enregistrées avec succès.",
    });
  };

  const handleDownloadFile = (fileId: string) => {
    // Simuler le téléchargement d'un fichier
    const file = patientFiles.find(f => f.id === fileId);
    
    toast({
      title: "Téléchargement démarré",
      description: `Le fichier ${file?.name} est en cours de téléchargement.`,
    });
  };

  const handleCreatePrescription = () => {
    // Simuler la création d'une ordonnance
    toast({
      title: "Ordonnance créée",
      description: "L'ordonnance a été créée et envoyée au patient.",
    });
    setPrescriptionText("");
  };

  const handleSaveDiagnosis = () => {
    // Simuler la sauvegarde du diagnostic
    toast({
      title: "Diagnostic enregistré",
      description: "Le diagnostic a été enregistré dans le dossier du patient.",
    });
    setDiagnosisText("");
  };

  const handleUploadFile = () => {
    // Simuler l'upload d'un fichier
    toast({
      title: "Fichier téléversé",
      description: "Le fichier a été ajouté au dossier du patient.",
    });
  };

  const handleEndConsultation = () => {
    toast({
      title: "Consultation terminée",
      description: "La téléconsultation a été terminée avec succès.",
    });
    navigate("/dashboard/appointments");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-pulse text-lg">Chargement de la téléconsultation...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!appointmentData) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Rendez-vous non trouvé</h2>
          <p className="mb-6">Le rendez-vous demandé n'existe pas ou a été annulé.</p>
          <Button onClick={() => navigate("/dashboard/appointments")}>
            Retour aux rendez-vous
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard/appointments")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold">Téléconsultation</h1>
          </div>
          
          <Button 
            variant="destructive" 
            onClick={handleEndConsultation}
          >
            Terminer la consultation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <VideoConsultation
              appointmentId={appointmentData.id}
              doctorName={appointmentData.doctorName}
              patientName={appointmentData.patientName}
              isDoctor={isDoctor}
            />
            
            {isDoctor && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Notes de consultation</CardTitle>
                  <CardDescription>
                    Prenez des notes pendant la consultation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    value={consultationNotes} 
                    onChange={(e) => setConsultationNotes(e.target.value)}
                    placeholder="Entrez vos notes ici..."
                    className="min-h-[150px]"
                  />
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveConsultationNotes}>
                    <FileCheck className="h-4 w-4 mr-2" />
                    Sauvegarder les notes
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations du rendez-vous</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Date et heure</p>
                    <p className="text-sm text-gray-500">
                      {appointmentData.date.toLocaleDateString()} à{" "}
                      {appointmentData.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {isDoctor ? "Patient" : "Médecin"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isDoctor ? appointmentData.patientName : appointmentData.doctorName}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Motif</p>
                    <p className="text-sm text-gray-500">
                      {appointmentData.reason}
                    </p>
                  </div>
                </div>

                {isDoctor && (
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Antécédents médicaux</p>
                      <p className="text-sm text-gray-500">
                        {appointmentData.medicalHistory}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {!isDoctor && (
              <Card>
                <CardHeader>
                  <CardTitle>Conseils pour la téléconsultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Assurez-vous d'être dans un endroit calme et bien éclairé</li>
                    <li>• Vérifiez que votre connexion internet est stable</li>
                    <li>• Préparez vos questions et documents médicaux à l'avance</li>
                    <li>• Ayez vos médicaments à portée de main pour les montrer si nécessaire</li>
                    <li>• En cas de problème technique, rafraîchissez la page ou reconnectez-vous</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {isDoctor && (
              <Tabs defaultValue="actions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="actions">Actions médicales</TabsTrigger>
                  <TabsTrigger value="documents">Documents patient</TabsTrigger>
                </TabsList>
                
                <TabsContent value="actions" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Actions médicales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <PenLine className="h-4 w-4 mr-2" />
                            Créer une ordonnance
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Rédiger une ordonnance</DialogTitle>
                            <DialogDescription>
                              Prescrivez des médicaments et traitements au patient
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Textarea 
                              value={prescriptionText} 
                              onChange={(e) => setPrescriptionText(e.target.value)}
                              placeholder="Entrez les médicaments et posologies..."
                              className="min-h-[200px]"
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleCreatePrescription}>
                              <FileCheck className="h-4 w-4 mr-2" />
                              Valider l'ordonnance
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Rédiger un diagnostic
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Diagnostic médical</DialogTitle>
                            <DialogDescription>
                              Entrez votre diagnostic pour ce patient
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Textarea 
                              value={diagnosisText} 
                              onChange={(e) => setDiagnosisText(e.target.value)}
                              placeholder="Entrez votre diagnostic..."
                              className="min-h-[200px]"
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleSaveDiagnosis}>
                              <FileCheck className="h-4 w-4 mr-2" />
                              Sauvegarder le diagnostic
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Ajouter un document
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Téléverser un document</DialogTitle>
                            <DialogDescription>
                              Ajoutez un document au dossier du patient
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">
                                Cliquez pour sélectionner un fichier ou déposez-le ici
                              </p>
                              <input
                                type="file"
                                className="hidden"
                                id="file-upload"
                              />
                              <label
                                htmlFor="file-upload"
                                className="mt-2 inline-block px-4 py-2 bg-primary text-white rounded-md cursor-pointer"
                              >
                                Sélectionner un fichier
                              </label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleUploadFile}>
                              <Upload className="h-4 w-4 mr-2" />
                              Téléverser
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          toast({
                            title: "Programmation en cours",
                            description: "Redirection vers le calendrier pour programmer un suivi."
                          });
                          navigate("/dashboard/schedule");
                        }}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Programmer un suivi
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Documents du patient</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant={activeFileCategory === "all" ? "default" : "outline"} 
                          size="sm" 
                          onClick={() => setActiveFileCategory("all")}
                        >
                          Tous
                        </Button>
                        <Button 
                          variant={activeFileCategory === "analyses" ? "default" : "outline"} 
                          size="sm" 
                          onClick={() => setActiveFileCategory("analyses")}
                        >
                          Analyses
                        </Button>
                        <Button 
                          variant={activeFileCategory === "ordonnances" ? "default" : "outline"} 
                          size="sm" 
                          onClick={() => setActiveFileCategory("ordonnances")}
                        >
                          Ordonnances
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {filteredFiles.length > 0 ? (
                          filteredFiles.map((file) => (
                            <div 
                              key={file.id} 
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-gray-500" />
                                <div>
                                  <p className="font-medium text-sm">{file.name}</p>
                                  <p className="text-xs text-gray-500">{file.date}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDownloadFile(file.id)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Impression en cours",
                                      description: `Impression de ${file.name} en cours...`
                                    });
                                  }}
                                >
                                  <Printer className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Partage",
                                      description: `Lien de partage pour ${file.name} copié.`
                                    });
                                  }}
                                >
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <FileText className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                            <p>Aucun document trouvé dans cette catégorie</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeleconsultationPage;
