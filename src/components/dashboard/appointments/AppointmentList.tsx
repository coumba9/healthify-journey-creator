import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle,
  MapPin,
  Phone,
  Mail,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Appointment {
  id: string;
  date: string;
  time: string;
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
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "status">("date");

  // Exemple de données enrichies
  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2024-03-20",
      time: "09:00",
      patientName: "Jean Dupont",
      doctorName: "Dr. Smith",
      status: "confirmed",
      type: "Consultation",
      location: "Cabinet 3, 2ème étage",
      contactInfo: {
        phone: "0123456789",
        email: "jean.dupont@email.com"
      },
      notes: "Apporter les résultats d'analyse"
    },
    {
      id: "2",
      date: "2024-03-21",
      time: "10:30",
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

  const handleStatusChange = (appointmentId: string, newStatus: "confirmed" | "cancelled") => {
    toast({
      title: `Rendez-vous ${newStatus === "confirmed" ? "confirmé" : "annulé"}`,
      description: `Le rendez-vous a été ${newStatus === "confirmed" ? "confirmé" : "annulé"} avec succès.`,
      variant: newStatus === "confirmed" ? "default" : "destructive",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesSearch =
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un patient ou médecin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <Select value={sortBy} onValueChange={(value: "date" | "status") => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="status">Statut</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

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
                <User className="h-4 w-4 mr-2 inline-block" /> Patient
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
                  <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-2">
                            <span>{appointment.patientName}</span>
                            {appointment.contactInfo && (
                              <div className="flex gap-1">
                                {appointment.contactInfo.phone && (
                                  <Phone className="h-4 w-4 text-gray-400" />
                                )}
                                {appointment.contactInfo.email && (
                                  <Mail className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-2">
                            {appointment.contactInfo?.phone && (
                              <p className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                {appointment.contactInfo.phone}
                              </p>
                            )}
                            {appointment.contactInfo?.email && (
                              <p className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {appointment.contactInfo.email}
                              </p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadgeClass(
                        appointment.status
                      )}`}
                    >
                      {getStatusIcon(appointment.status)}
                      {appointment.status === "confirmed"
                        ? "Confirmé"
                        : appointment.status === "pending"
                        ? "En attente"
                        : "Annulé"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {appointment.notes && (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-2">
                            {appointment.location && (
                              <p className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {appointment.location}
                              </p>
                            )}
                            {appointment.notes && (
                              <p className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {appointment.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleStatusChange(appointment.id, "confirmed")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Confirmer
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(appointment.id, "cancelled")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Annuler
                          </Button>
                        </>
                      )}
                    </div>
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