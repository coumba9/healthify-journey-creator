
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
import { Calendar, Clock, User, FileText, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentStatus from "./AppointmentStatus";
import AppointmentActions from "./AppointmentActions";
import AppointmentDetails from "./AppointmentDetails";
import AppointmentTicket from "@/components/appointment/AppointmentTicket";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  speciality?: string;
  isTeleconsultation?: boolean;
}

const AppointmentList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "status">("date");

  // Exemple de données enrichies - Dans un cas réel, ces données viendraient d'une API
  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2024-03-20",
      time: "09:00",
      patientId: user?.id || "",
      patientName: user?.name || "Non spécifié",
      doctorName: "Dr. Smith",
      status: "confirmed",
      type: "Consultation",
      location: "Cabinet 3, 2ème étage",
      speciality: "Cardiologie",
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
      patientId: user?.id || "",
      patientName: user?.name || "Non spécifié",
      doctorName: "Dr. Johnson",
      status: "pending",
      type: "Suivi",
      location: "Cabinet 5, 1er étage",
      speciality: "Généraliste",
      contactInfo: {
        phone: user?.phone || "Non spécifié",
        email: user?.email || "Non spécifié"
      }
    },
    {
      id: "3",
      date: "2024-03-22",
      time: "14:00",
      patientId: user?.id || "",
      patientName: user?.name || "Non spécifié",
      doctorName: "Dr. Martin",
      status: "confirmed",
      type: "Téléconsultation",
      speciality: "Dermatologie",
      isTeleconsultation: true,
      contactInfo: {
        phone: user?.phone || "Non spécifié",
        email: user?.email || "Non spécifié"
      },
      notes: "Préparez vos questions avant la session"
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

  const handleJoinTeleconsultation = (appointmentId: string) => {
    navigate(`/dashboard/teleconsultation/${appointmentId}`);
  };

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
              <TableHead>Ticket</TableHead>
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
                  <TableCell className="flex items-center gap-1">
                    {appointment.isTeleconsultation && (
                      <Video className="h-4 w-4 text-blue-500" />
                    )}
                    {appointment.type}
                  </TableCell>
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
                    <div className="flex gap-2">
                      <AppointmentActions
                        appointmentId={appointment.id}
                        status={appointment.status}
                      />
                      
                      {appointment.isTeleconsultation && appointment.status === "confirmed" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                          onClick={() => handleJoinTeleconsultation(appointment.id)}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Rejoindre
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {appointment.status === "confirmed" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Voir ticket
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <AppointmentTicket appointment={appointment} />
                        </DialogContent>
                      </Dialog>
                    )}
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
