import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Calendar as CalendarIcon,
  Clock,
  Activity,
  FileText,
  Bell,
} from "lucide-react";
import { useState } from "react";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Exemple de données pour les graphiques
  const consultationData = [
    { month: "Jan", consultations: 65 },
    { month: "Fév", consultations: 75 },
    { month: "Mar", consultations: 85 },
    { month: "Avr", consultations: 70 },
    { month: "Mai", consultations: 90 },
    { month: "Juin", consultations: 95 },
  ];

  const patientData = [
    { week: "Sem 1", nouveaux: 4, suivis: 12 },
    { week: "Sem 2", nouveaux: 6, suivis: 15 },
    { week: "Sem 3", nouveaux: 5, suivis: 14 },
    { week: "Sem 4", nouveaux: 8, suivis: 18 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>

        {/* Cartes de statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Patients aujourd'hui
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 par rapport à hier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Prochain RDV
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14:30</div>
              <p className="text-xs text-muted-foreground">
                Jean Dupont - Consultation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Taux d'occupation
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Documents en attente
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                À traiter aujourd'hui
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendrier et RDV */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Planning du jour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                {[
                  { time: "09:00", patient: "Marie Martin", type: "Suivi" },
                  { time: "10:30", patient: "Paul Dubois", type: "Consultation" },
                  { time: "14:30", patient: "Jean Dupont", type: "Contrôle" },
                ].map((rdv, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{rdv.time}</span>
                      <span>{rdv.patient}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {rdv.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Graphique des consultations */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={consultationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consultations" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Notifications et alertes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Nouveau message",
                    message: "Message de Marie Martin concernant son traitement",
                    time: "Il y a 30 min",
                  },
                  {
                    title: "Rappel",
                    message: "Réunion d'équipe à 16h00",
                    time: "Il y a 1h",
                  },
                  {
                    title: "Document reçu",
                    message: "Résultats d'analyses de Paul Dubois",
                    time: "Il y a 2h",
                  },
                ].map((notif, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="font-medium">{notif.title}</div>
                    <p className="text-sm text-muted-foreground">
                      {notif.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notif.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Graphique patients nouveaux/suivis */}
          <Card>
            <CardHeader>
              <CardTitle>Suivi des patients</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="nouveaux"
                    stroke="#3b82f6"
                    name="Nouveaux patients"
                  />
                  <Line
                    type="monotone"
                    dataKey="suivis"
                    stroke="#10b981"
                    name="Patients suivis"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
