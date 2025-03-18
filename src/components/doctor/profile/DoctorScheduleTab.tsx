
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorScheduleTabProps {
  onBookAppointment: () => void;
  schedules: { days: string; hours: string }[];
}

const DoctorScheduleTab = ({ onBookAppointment, schedules }: DoctorScheduleTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <Button className="w-full" onClick={onBookAppointment}>
          <Calendar className="h-4 w-4 mr-2" />
          Prendre rendez-vous
        </Button>
        <div className="space-y-2">
          <h3 className="font-semibold">Horaires d'ouverture</h3>
          {schedules.map((schedule, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{schedule.days}</span>
              </div>
              <span>{schedule.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduleTab;
