import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPin, AlertCircle } from "lucide-react";

interface AppointmentDetailsProps {
  location?: string;
  notes?: string;
}

const AppointmentDetails = ({ location, notes }: AppointmentDetailsProps) => {
  if (!location && !notes) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            {notes && <AlertCircle className="h-4 w-4 text-yellow-500" />}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2">
            {location && (
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {location}
              </p>
            )}
            {notes && (
              <p className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {notes}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AppointmentDetails;