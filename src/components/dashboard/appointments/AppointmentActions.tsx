import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentActionsProps {
  appointmentId: string;
  status: "pending" | "confirmed" | "cancelled";
}

const AppointmentActions = ({ appointmentId, status }: AppointmentActionsProps) => {
  const { toast } = useToast();

  const handleStatusChange = (newStatus: "confirmed" | "cancelled") => {
    toast({
      title: `Rendez-vous ${newStatus === "confirmed" ? "confirmé" : "annulé"}`,
      description: `Le rendez-vous a été ${
        newStatus === "confirmed" ? "confirmé" : "annulé"
      } avec succès.`,
      variant: newStatus === "confirmed" ? "default" : "destructive",
    });
  };

  if (status !== "pending") return null;

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        className="bg-green-500 hover:bg-green-600"
        onClick={() => handleStatusChange("confirmed")}
      >
        <CheckCircle2 className="h-4 w-4 mr-1" />
        Confirmer
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => handleStatusChange("cancelled")}
      >
        <XCircle className="h-4 w-4 mr-1" />
        Annuler
      </Button>
    </div>
  );
};

export default AppointmentActions;