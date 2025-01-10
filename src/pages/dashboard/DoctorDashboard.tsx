import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DoctorDashboard = () => {
  const appointments = [
    { id: 1, patient: "Jean Dupont", time: "09:00", status: "En attente" },
    { id: 2, patient: "Marie Martin", time: "09:30", status: "Confirmé" },
    { id: 3, patient: "Pierre Durant", time: "10:00", status: "Confirmé" },
  ];

  const stats = {
    consultationsMonth: 45,
    patientsTotal: 120,
    waitingPatients: 3,
    nextAvailable: "2024-03-22",
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
                    <TableHead>Patient</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patient}</TableCell>
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
                  <p className="text-sm text-gray-500">Consultations du mois</p>
                  <p className="text-2xl font-bold">{stats.consultationsMonth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total patients</p>
                  <p className="text-2xl font-bold">{stats.patientsTotal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patients en attente</p>
                  <p className="text-2xl font-bold">{stats.waitingPatients}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prochaine disponibilité</p>
                  <p className="text-2xl font-bold">{stats.nextAvailable}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;