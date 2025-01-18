import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentStatus from "./AppointmentStatus";
import AppointmentActions from "./AppointmentActions";
import AppointmentDetails from "./AppointmentDetails";

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  status: "pending" | "confirmed" | "cancelled";
  type: string;
  location?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  notes?: string;
}

const AppointmentList = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "status">("date");

  // Exemple de données enrichies - Dans un cas réel, ces données viendraient d'une API
  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2024-03-20",
      time: "09:00",
      patientId: "1", // ID correspondant à l'utilisateur connecté
      patientName: user?.name || "Non spécifié",
      doctorName: "Dr. Smith",
      status: "confirmed",
      type: "Consultation",
      location: "Cabinet 3, 2ème étage",
      contactInfo: {
        phone: user?.phone || "Non spécifié",
        email: user?.email || "Non spécifié"
      },
      notes: "Apporter les résultats d'analyse"
    },
    {
      id: "2",
      date: "2024-03-21",
      time: "10:30",
      patientId: "2",
      patientName: "Marie Martin",
      doctorName: "Dr. Johnson",
      status: "pending",
      type: "Suivi",
      location: "Cabinet 5, 1er étage",
      contactInfo: {
        phone: "0987654321",
        email: "marie.martin@email.com"
      }
    }
  ];

  // Filtrer les rendez-vous pour n'afficher que ceux de l'utilisateur connecté
  const userAppointments = appointments.filter(
    (appointment) => appointment.patientId === user?.id
  );

  const filteredAppointments = userAppointments
    .filter((appointment) => {
      const matchesSearch = appointment.doctorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || appointment.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return a.status.localeCompare(b.status);
      }
    });

  return (
    <div className="space-y-4">
      <AppointmentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="rounded-md border overflow-hidden">
        <Table>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredAppointments.map((appointment) => (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50"
                >
                  <TableCell>
                    {new Date(appointment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>
                    <AppointmentStatus status={appointment.status} />
                  </TableCell>
                  <TableCell>
                    <AppointmentDetails
                      location={appointment.location}
                      notes={appointment.notes}
                    />
                  </TableCell>
                  <TableCell>
                    <AppointmentActions
                      appointmentId={appointment.id}
                      status={appointment.status}
                    />
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentList;
