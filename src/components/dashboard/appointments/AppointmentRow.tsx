
import { TableCell, TableRow } from "@/components/ui/table";
import { Video } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import AppointmentStatus from "./AppointmentStatus";
import AppointmentDetails from "./AppointmentDetails";
import AppointmentActions from "./AppointmentActions";
import AppointmentTicket from "@/components/appointment/AppointmentTicket";
import { Appointment } from "@/types/appointment";

interface AppointmentRowProps {
  appointment: Appointment;
}

const AppointmentRow = ({ appointment }: AppointmentRowProps) => {
  const navigate = useNavigate();

  const handleJoinTeleconsultation = (appointmentId: string) => {
    navigate(`/dashboard/teleconsultation/${appointmentId}`);
  };

  return (
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
  );
};

export default AppointmentRow;
