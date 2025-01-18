import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface AppointmentStatusProps {
  status: "pending" | "confirmed" | "cancelled";
}

const AppointmentStatus = ({ status }: AppointmentStatusProps) => {
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

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadgeClass(
        status
      )}`}
    >
      {getStatusIcon(status)}
      {status === "confirmed"
        ? "Confirmé"
        : status === "pending"
        ? "En attente"
        : "Annulé"}
    </span>
  );
};

export default AppointmentStatus;