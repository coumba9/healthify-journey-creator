
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import AppointmentList from "@/components/dashboard/appointments/AppointmentList";
import AppointmentTicket from "@/components/appointment/AppointmentTicket";
import ReminderPreferences from "@/components/dashboard/appointments/ReminderPreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { PlusCircle, Info } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AppointmentsPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
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

  // Handle status params from payment redirects
  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success') {
      toast({
        title: "Paiement réussi",
        description: "Votre rendez-vous a été confirmé avec succès.",
      });
    } else if (status === 'cancelled') {
      toast({
        title: "Paiement annulé",
        description: "Votre paiement a été annulé. Veuillez réessayer.",
        variant: "destructive",
      });
    }
    
    // Handle SMS status
    const smsStatus = searchParams.get('smsStatus');
    if (smsStatus === 'sent') {
      toast({
        title: "SMS envoyé",
        description: "Un message de confirmation a été envoyé à votre numéro de téléphone.",
      });
    } else if (smsStatus === 'failed') {
      toast({
        title: "Envoi SMS échoué",
        description: "Le SMS n'a pas pu être envoyé. Vérifiez votre numéro de téléphone.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
          <Button asChild>
            <Link to="/dashboard/appointments/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau rendez-vous avec paiement
            </Link>
          </Button>
        </div>
        
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
              <div className="text-center mb-6">
                <p className="mb-4">Créer un nouveau rendez-vous avec options de paiement avancées :</p>
                <Button asChild className="mx-auto">
                  <Link to="/dashboard/appointments/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Rendez-vous avec Wave, Orange Money et autres options
                  </Link>
                </Button>
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Information sur les SMS</p>
                  <p>Pour recevoir des rappels par SMS, assurez-vous d'avoir activé cette option dans l'onglet "Préférences de rappel" et d'avoir entré un numéro de téléphone valide au format international (ex: +221 77 123 45 67).</p>
                </div>
              </div>
              
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
