import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import AppointmentList from "@/components/dashboard/appointments/AppointmentList";
import AppointmentTicket from "@/components/appointment/AppointmentTicket";
import ReminderPreferences from "@/components/dashboard/appointments/ReminderPreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const AppointmentsPage = () => {
  // Exemple de données de rendez-vous (à remplacer par des vraies données)
  const nextAppointment = {
    id: "1",
    date: "20 Mars 2024",
    time: "14:00",
    doctorName: "Dr. Smith",
    location: "Cabinet Medical Central",
    speciality: "Cardiologie"
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Prochains rendez-vous</TabsTrigger>
            <TabsTrigger value="new">Nouveau rendez-vous</TabsTrigger>
            <TabsTrigger value="ticket">Mon ticket</TabsTrigger>
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

          <TabsContent value="ticket">
            <div className="grid gap-6">
              <AppointmentTicket appointment={nextAppointment} />
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