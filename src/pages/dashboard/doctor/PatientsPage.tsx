import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  UserPlus,
  FileText,
  Calendar,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  nextVisit: string;
  email: string;
  phone: string;
}

const PatientsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPatient, setShowAddPatient] = useState(false);

  // Exemple de données de patients (à remplacer par une vraie API)
  const [patients] = useState<Patient[]>([
    {
      id: "1",
      name: "Jean Dupont",
      age: 45,
      lastVisit: "15/03/2024",
      nextVisit: "22/04/2024",
      email: "jean.dupont@email.com",
      phone: "06 12 34 56 78",
    },
    {
      id: "2",
      name: "Marie Martin",
      age: 32,
      lastVisit: "10/03/2024",
      nextVisit: "17/04/2024",
      email: "marie.martin@email.com",
      phone: "06 98 76 54 32",
    },
    {
      id: "3",
      name: "Pierre Durant",
      age: 28,
      lastVisit: "05/03/2024",
      nextVisit: "12/04/2024",
      email: "pierre.durant@email.com",
      phone: "06 11 22 33 44",
    },
  ]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logique d'ajout de patient ici
    toast({
      title: "Patient ajouté",
      description: "Le nouveau patient a été ajouté avec succès.",
    });
    setShowAddPatient(false);
  };

  const handleViewMedicalRecord = (patientId: string) => {
    navigate(`/dashboard/patients/${patientId}/medical-record`);
    toast({
      title: "Dossier médical",
      description: "Ouverture du dossier médical du patient",
    });
  };

  const handleScheduleAppointment = (patientId: string) => {
    navigate(`/dashboard/schedule?patient=${patientId}`);
    toast({
      title: "Rendez-vous",
      description: "Redirection vers la page de prise de rendez-vous",
    });
  };

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={showAddPatient} onOpenChange={setShowAddPatient}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Ajouter un patient
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau patient</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddPatient} className="space-y-4">
                  <Input placeholder="Nom complet" required />
                  <Input placeholder="Email" type="email" required />
                  <Input placeholder="Téléphone" required />
                  <Input placeholder="Âge" type="number" required />
                  <Button type="submit" className="w-full">
                    Ajouter le patient
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-600">
                      {patient.age} ans - Tél: {patient.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Dernière visite: {patient.lastVisit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleViewMedicalRecord(patient.id)}
                    >
                      <FileText className="h-4 w-4" />
                      Dossier médical
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => handleScheduleAppointment(patient.id)}
                    >
                      <Calendar className="h-4 w-4" />
                      Prendre RDV
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "Email envoyé",
                              description: "Un email a été envoyé au patient",
                            });
                          }}
                        >
                          Envoyer un email
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "SMS envoyé",
                              description: "Un SMS a été envoyé au patient",
                            });
                          }}
                        >
                          Envoyer un SMS
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            toast({
                              title: "Patient archivé",
                              description: "Le patient a été archivé",
                            });
                          }}
                        >
                          Archiver le patient
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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