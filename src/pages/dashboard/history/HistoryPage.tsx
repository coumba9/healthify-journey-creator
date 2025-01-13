import { History, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  doctor: string;
  description: string;
}

const HistoryPage = () => {
  // Example medical records (to be replaced with real data from Supabase later)
  const medicalRecords: MedicalRecord[] = [
    {
      id: "1",
      date: "2024-03-10",
      type: "Consultation",
      doctor: "Dr. Smith",
      description: "Consultation générale",
    },
    {
      id: "2",
      date: "2024-02-15",
      type: "Examen",
      doctor: "Dr. Johnson",
      description: "Analyse de sang",
    },
    {
      id: "3",
      date: "2024-01-20",
      type: "Prescription",
      doctor: "Dr. Brown",
      description: "Renouvellement ordonnance",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Historique Médical</h1>
          <History className="h-6 w-6 text-gray-500" />
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher dans l'historique..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Médecin</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.doctor}</TableCell>
                  <TableCell>{record.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HistoryPage;