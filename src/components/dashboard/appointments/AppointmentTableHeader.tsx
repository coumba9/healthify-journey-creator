
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, User } from "lucide-react";

const AppointmentTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">
          <Calendar className="h-4 w-4 mr-2 inline-block" /> Date
        </TableHead>
        <TableHead className="w-[100px]">
          <Clock className="h-4 w-4 mr-2 inline-block" /> Heure
        </TableHead>
        <TableHead>
          <User className="h-4 w-4 mr-2 inline-block" /> Médecin
        </TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Statut</TableHead>
        <TableHead>Détails</TableHead>
        <TableHead>Actions</TableHead>
        <TableHead>Ticket</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default AppointmentTableHeader;
