import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import AppointmentList from "@/components/dashboard/appointments/AppointmentList";
import AppointmentTicket from "@/components/appointment/AppointmentTicket";
import ReminderPreferences from "@/components/dashboard/appointments/ReminderPreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const AppointmentsPage = () => {
  // Exemple de données de rendez-vous confirmés (à remplacer par des vraies données)
  const confirmedAppointments = [
    {
      id: "1",
      date: "20 Mars 2024",
      time: "14:00",
      doctorName: "Dr. Smith",
      location: "Cabinet Medical Central",
      speciality: "Cardiologie"
    },
    {
      id: "2",
      date: "25 Mars 2024",
      time: "10:30",
      doctorName: "Dr. Johnson",
      location: "Clinique du Centre",
      speciality: "Dermatologie"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Prochains rendez-vous</TabsTrigger>
            <TabsTrigger value="new">Nouveau rendez-vous</TabsTrigger>
            <TabsTrigger value="tickets">Mes Tickets</TabsTrigger>
            <TabsTrigger value="preferences">Préférences de rappel</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card className="p-6">
              <AppointmentList />
            </Card>
          </TabsContent>

          <TabsContent value="new">
            <Card className="p-6">
              <AppointmentForm />
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {confirmedAppointments.length > 0 ? (
                confirmedAppointments.map((appointment) => (
                  <AppointmentTicket 
                    key={appointment.id} 
                    appointment={appointment} 
                  />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  Aucun ticket de rendez-vous confirmé disponible
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <ReminderPreferences />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsPage;