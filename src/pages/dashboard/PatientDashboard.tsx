import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PatientDashboard = () => {
  const { toast } = useToast();

  const appointments = [
    { id: 1, doctor: "Dr. Smith", date: "2024-03-20", time: "14:00", status: "Confirmé" },
    { id: 2, doctor: "Dr. Johnson", date: "2024-03-25", time: "10:30", status: "En attente" },
  ];

  const documents = [
    { id: 1, name: "Ordonnance", date: "2024-03-15", type: "PDF" },
    { id: 2, name: "Analyse sang", date: "2024-03-10", type: "PDF" },
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
              <CardTitle>Mes Rendez-vous</CardTitle>
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
              <CardTitle>Mes Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.type}</TableCell>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;