import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import AppointmentTicket from "@/components/appointment/AppointmentTicket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const AppointmentsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Exemple de rendez-vous (à remplacer par des données réelles)
  const upcomingAppointment = {
    id: "1",
    date: "20 Mars 2024",
    time: "14:30",
    doctorName: "Martin",
    location: "Cabinet Médical Central",
    speciality: "Cardiologie",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Prochains rendez-vous</TabsTrigger>
            <TabsTrigger value="new">Nouveau rendez-vous</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <AppointmentTicket appointment={upcomingAppointment} />
              <Card>
                <CardHeader>
                  <CardTitle>Calendrier</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>Prendre un rendez-vous</CardTitle>
              </CardHeader>
              <CardContent>
                <AppointmentForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des rendez-vous</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Historique de vos rendez-vous précédents...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsPage;