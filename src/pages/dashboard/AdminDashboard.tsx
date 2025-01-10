import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AdminDashboard = () => {
  const recentUsers = [
    { id: 1, name: "Jean Dupont", role: "Patient", date: "2024-03-15" },
    { id: 2, name: "Dr. Smith", role: "Médecin", date: "2024-03-14" },
    { id: 3, name: "Marie Martin", role: "Patient", date: "2024-03-13" },
  ];

  const stats = {
    totalUsers: 150,
    totalDoctors: 10,
    totalPatients: 140,
    activeAppointments: 45,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord Administrateur</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques Globales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Utilisateurs</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Médecins</p>
                  <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Patients</p>
                  <p className="text-2xl font-bold">{stats.totalPatients}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rendez-vous Actifs</p>
                  <p className="text-2xl font-bold">{stats.activeAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.date}</TableCell>
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

export default AdminDashboard;