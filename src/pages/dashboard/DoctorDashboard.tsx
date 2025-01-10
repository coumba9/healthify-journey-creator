import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DoctorDashboard = () => {
  const { toast } = useToast();

  const appointments = [
    { 
      id: 1, 
      patient: "Jean Dupont",
      date: "2024-03-20",
      time: "14:00",
      service: "Consultation générale",
      status: "Confirmé"
    },
    { 
      id: 2, 
      patient: "Marie Martin",
      date: "2024-03-25",
      time: "10:30",
      service: "Suivi",
      status: "En attente"
    },
  ];

  const handleConfirmAppointment = (id: number) => {
    toast({
      title: "Rendez-vous confirmé",
      description: "Le rendez-vous a été confirmé.",
    });
  };

  const handleCancelAppointment = (id: number) => {
    toast({
      title: "Rendez-vous annulé",
      description: "Le rendez-vous a été annulé.",
    });
  };

  const handleRescheduleAppointment = (id: number) => {
    toast({
      title: "Rendez-vous reporté",
      description: "Le rendez-vous a été reporté.",
    });
  };

  const handleStartConsultation = (id: number) => {
    toast({
      title: "Consultation démarrée",
      description: "La consultation a commencé.",
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
              <CardTitle>Planning du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rendez-vous à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patient}</TableCell>
                      <TableCell>{`${appointment.date} ${appointment.time}`}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="default"
                          size="sm"
                          onClick={() => handleStartConsultation(appointment.id)}
                        >
                          Démarrer
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfirmAppointment(appointment.id)}
                        >
                          Confirmer
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline"
                              size="sm"
                            >
                              Reporter
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reporter le rendez-vous</DialogTitle>
                            </DialogHeader>
                            <Calendar
                              mode="single"
                              className="rounded-md border"
                              onSelect={(date) => {
                                if (date) {
                                  handleRescheduleAppointment(appointment.id);
                                }
                              }}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Annuler
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
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                  <p className="text-sm text-gray-600">Consultations aujourd'hui</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="p-4 border rounded">
                  <p className="text-sm text-gray-600">Consultations cette semaine</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <div className="p-4 border rounded">
                  <p className="text-sm text-gray-600">Patients en attente</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="p-4 border rounded">
                  <p className="text-sm text-gray-600">Total patients</p>
                  <p className="text-2xl font-bold">150</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dossiers patients récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.service}</p>
                    </div>
                    <Button variant="outline" size="sm">Voir dossier</Button>
                  </div>
                ))}
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