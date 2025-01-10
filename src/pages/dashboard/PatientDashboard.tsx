import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PatientDashboard = () => {
  const { toast } = useToast();
  const appointments = [
    { id: 1, doctor: "Dr. Smith", date: "2024-03-20", time: "14:00", status: "Confirmé" },
    { id: 2, doctor: "Dr. Johnson", date: "2024-03-25", time: "10:30", status: "En attente" },
  ];

  const documents = [
    { id: 1, name: "Ordonnance - 15/03/2024", type: "PDF", size: "156 KB" },
    { id: 2, name: "Résultats Analyses - 10/03/2024", type: "PDF", size: "2.3 MB" },
  ];

  const prescriptions = [
    { id: 1, medication: "Paracétamol", dosage: "1000mg", frequency: "3x/jour", duration: "5 jours" },
    { id: 2, medication: "Amoxicilline", dosage: "500mg", frequency: "2x/jour", duration: "7 jours" },
  ];

  const handleDownload = (documentName: string) => {
    toast({
      title: "Téléchargement",
      description: `Le document ${documentName} va être téléchargé.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord Patient</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Prendre un rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mes rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Médecin</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mes documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(doc.name)}
                        >
                          Télécharger
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mes prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Médicament</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Fréquence</TableHead>
                    <TableHead>Durée</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.frequency}</TableCell>
                      <TableCell>{prescription.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;