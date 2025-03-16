
import { Table, TableBody } from "@/components/ui/table";
import { AnimatePresence } from "framer-motion";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentTableHeader from "./AppointmentTableHeader";
import AppointmentRow from "./AppointmentRow";
import { useAppointments } from "@/hooks/useAppointments";

const AppointmentList = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredAppointments
  } = useAppointments();

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
          <AppointmentTableHeader />
          <TableBody>
            <AnimatePresence>
              {filteredAppointments.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentList;
