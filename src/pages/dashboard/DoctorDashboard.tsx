import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DoctorDashboard = () => {
  const { toast } = useToast();
  
  const todayAppointments = [
    { id: 1, time: "09:00", patient: "Jean Dupont", reason: "Consultation", status: "Confirmé" },
    { id: 2, time: "10:30", patient: "Marie Martin", reason: "Suivi", status: "En attente" },
  ];

  const patients = [
    { id: 1, name: "Jean Dupont", lastVisit: "2024-03-15", nextVisit: "2024-03-20" },
    { id: 2, name: "Marie Martin", lastVisit: "2024-03-10", nextVisit: "2024-03-25" },
  ];

  const stats = {
    consultationsToday: 8,
    consultationsWeek: 45,
    waitingPatients: 3,
    totalPatients: 150,
  };

  const handleCreatePrescription = () => {
    toast({
      title: "Nouvelle ordonnance",
      description: "L'ordonnance a été créée et envoyée au patient.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord Médecin</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Rendez-vous du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Heure</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.patient}</TableCell>
                      <TableCell>{appointment.reason}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Consultations aujourd'hui</p>
                  <p className="text-2xl font-bold">{stats.consultationsToday}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Consultations cette semaine</p>
                  <p className="text-2xl font-bold">{stats.consultationsWeek}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patients en attente</p>
                  <p className="text-2xl font-bold">{stats.waitingPatients}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total patients</p>
                  <p className="text-2xl font-bold">{stats.totalPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mes patients</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Dernière visite</TableHead>
                    <TableHead>Prochain RDV</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>{patient.nextVisit}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCreatePrescription}
                        >
                          Ordonnance
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

export default DoctorDashboard;