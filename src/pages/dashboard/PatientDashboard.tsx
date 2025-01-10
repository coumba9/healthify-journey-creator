import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PatientDashboard = () => {
  const { toast } = useToast();
  
  const appointments = [
    { 
      id: 1, 
      doctor: "Dr. Smith", 
      date: "2024-03-20", 
      time: "14:00", 
      status: "Confirmé",
      service: "Consultation générale"
    },
    { 
      id: 2, 
      doctor: "Dr. Johnson", 
      date: "2024-03-25", 
      time: "10:30", 
      status: "En attente",
      service: "Cardiologie"
    },
  ];

  const handleCancelAppointment = (id: number) => {
    toast({
      title: "Rendez-vous annulé",
      description: "Votre rendez-vous a été annulé avec succès.",
    });
  };

  const handleRescheduleAppointment = (id: number) => {
    toast({
      title: "Rendez-vous reporté",
      description: "Choisissez une nouvelle date pour votre rendez-vous.",
    });
  };

  const handleConfirmAppointment = (id: number) => {
    toast({
      title: "Rendez-vous confirmé",
      description: "Votre rendez-vous a été confirmé.",
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
              <CardTitle>Mes rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Médecin</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{`${appointment.date} ${appointment.time}`}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell className="space-x-2">
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
              <CardTitle>Nouveau rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents médicaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded">
                  <span>Ordonnance - 15/03/2024</span>
                  <Button variant="outline" size="sm">Télécharger</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <span>Résultats Analyses - 10/03/2024</span>
                  <Button variant="outline" size="sm">Télécharger</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historique des consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 border rounded">
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-gray-600">{`${appointment.date} - ${appointment.service}`}</p>
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

export default PatientDashboard;