import { CreditCard, Download, Search, Plus } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

interface Payment {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: "paid" | "pending" | "failed";
  paymentMethod: "wave" | "orange-money";
}

const PaymentsPage = () => {
  const navigate = useNavigate();
  
  // Example payments (à remplacer avec des données réelles plus tard)
  const payments: Payment[] = [
    {
      id: "1",
      date: "2024-03-10",
      amount: 15000,
      description: "Consultation générale",
      status: "paid",
      paymentMethod: "wave"
    },
    {
      id: "2",
      date: "2024-02-15",
      amount: 25000,
      description: "Analyse de sang",
      status: "pending",
      paymentMethod: "orange-money"
    },
    {
      id: "3",
      date: "2024-01-20",
      amount: 10000,
      description: "Prescription médicale",
      status: "paid",
      paymentMethod: "wave"
    },
  ];

  const handleNewPayment = () => {
    navigate("/appointment/new");
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Paiements</h1>
            <p className="text-gray-500 mt-2">Gérez vos paiements et transactions</p>
          </div>
          <Button onClick={handleNewPayment} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Paiement
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un paiement..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Télécharger l'historique
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={`/${payment.paymentMethod}-logo.png`}
                        alt={payment.paymentMethod}
                        className="h-6 w-6 object-contain"
                      />
                      {payment.paymentMethod === 'wave' ? 'Wave' : 'Orange Money'}
                    </div>
                  </TableCell>
                  <TableCell>{payment.amount.toLocaleString('fr-FR')} FCFA</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        payment.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status === "paid"
                        ? "Payé"
                        : payment.status === "pending"
                        ? "En attente"
                        : "Échoué"}
                    </span>
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

export default PaymentsPage;