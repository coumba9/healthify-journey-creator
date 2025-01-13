import { Pill, Search, Download, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Prescription {
  id: string;
  date: string;
  doctor: string;
  medications: string[];
  status: "active" | "expired" | "pending";
}

const PrescriptionsPage = () => {
  // Example prescriptions (to be replaced with real data from Supabase later)
  const prescriptions: Prescription[] = [
    {
      id: "1",
      date: "2024-03-10",
      doctor: "Dr. Smith",
      medications: ["Paracétamol", "Ibuprofène"],
      status: "active",
    },
    {
      id: "2",
      date: "2024-02-15",
      doctor: "Dr. Johnson",
      medications: ["Amoxicilline"],
      status: "expired",
    },
    {
      id: "3",
      date: "2024-01-20",
      doctor: "Dr. Brown",
      medications: ["Ventoline", "Cortisone"],
      status: "active",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Prescriptions</h1>
          <Pill className="h-6 w-6 text-gray-500" />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une prescription..."
              className="pl-10"
            />
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exporter les prescriptions
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Médecin</TableHead>
                <TableHead>Médicaments</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>
                    {new Date(prescription.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{prescription.doctor}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {prescription.medications.map((med, index) => (
                        <li key={index}>{med}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        prescription.status === "active"
                          ? "bg-green-100 text-green-800"
                          : prescription.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {prescription.status === "active"
                        ? "Active"
                        : prescription.status === "pending"
                        ? "En attente"
                        : "Expirée"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrescriptionsPage;