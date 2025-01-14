import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

  // Données d'exemple pour le graphique
  const chartData = [
    { name: "Jan", value: 30 },
    { name: "Fév", value: 45 },
    { name: "Mar", value: 38 },
    { name: "Avr", value: 50 },
    { name: "Mai", value: 42 },
    { name: "Juin", value: 55 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
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

      <Card>
        <CardHeader>
          <CardTitle>Activité mensuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;