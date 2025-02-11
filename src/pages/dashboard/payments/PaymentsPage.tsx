import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { History, Receipt, Download } from "lucide-react";

const PaymentsPage = () => {
  const { toast } = useToast();
  const [payments] = useState([
    {
      id: "1",
      date: "2024-02-09",
      amount: 15000,
      type: "Consultation",
      status: "Payé",
      method: "Wave",
    },
    {
      id: "2",
      date: "2024-02-08",
      amount: 25000,
      type: "Analyses",
      status: "Payé",
      method: "Orange Money",
    },
  ]);

  const handleDownloadReceipt = (paymentId: string) => {
    toast({
      title: "Téléchargement de la facture",
      description: "La facture sera bientôt disponible",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <History className="h-8 w-8 text-primary-600" />
            Historique des Paiements
          </h1>
          <p className="text-gray-500 mt-2">
            Consultez l'historique de vos transactions
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary-600" />
              Transactions récentes
            </CardTitle>
            <CardDescription>
              Liste de vos dernières transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>{payment.amount} FCFA</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadReceipt(payment.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsPage;