import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import AppointmentList from "@/components/dashboard/appointments/AppointmentList";
import ReminderPreferences from "@/components/dashboard/appointments/ReminderPreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const AppointmentsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Prochains rendez-vous</TabsTrigger>
            <TabsTrigger value="new">Nouveau rendez-vous</TabsTrigger>
            <TabsTrigger value="preferences">Préférences de rappel</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card>
              <AppointmentList />
            </Card>
          </TabsContent>

          <TabsContent value="new">
            <Card className="p-6">
              <AppointmentForm />
            </Card>
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