import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Calendar, Activity, TrendingUp } from "lucide-react";

const DashboardStats = () => {
  // Données d'exemple pour les statistiques
  const stats = [
    { title: "Total Patients", value: 1234, icon: Users, color: "text-blue-500" },
    { title: "Rendez-vous", value: 56, icon: Calendar, color: "text-green-500" },
    { title: "Consultations", value: 89, icon: Activity, color: "text-purple-500" },
    { title: "Croissance", value: "+12%", icon: TrendingUp, color: "text-orange-500" },
  ];

  // Données d'exemple pour le graphique en barres
  const barChartData = [
    { name: "Jan", consultations: 30, rendezVous: 40 },
    { name: "Fév", consultations: 45, rendezVous: 50 },
    { name: "Mar", consultations: 38, rendezVous: 45 },
    { name: "Avr", consultations: 50, rendezVous: 55 },
    { name: "Mai", consultations: 42, rendezVous: 48 },
    { name: "Juin", consultations: 55, rendezVous: 60 },
  ];

  // Données d'exemple pour le graphique en ligne
  const lineChartData = [
    { name: "Sem 1", patients: 100 },
    { name: "Sem 2", patients: 120 },
    { name: "Sem 3", patients: 115 },
    { name: "Sem 4", patients: 130 },
    { name: "Sem 5", patients: 125 },
    { name: "Sem 6", patients: 140 },
  ];

  // Données d'exemple pour le graphique circulaire
  const pieChartData = [
    { name: "Cardiologie", value: 30 },
    { name: "Pédiatrie", value: 25 },
    { name: "Neurologie", value: 20 },
    { name: "Dermatologie", value: 25 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité mensuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consultations" fill="#4f46e5" name="Consultations" />
                  <Bar dataKey="rendezVous" fill="#10b981" name="Rendez-vous" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution des patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="patients" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution par service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;