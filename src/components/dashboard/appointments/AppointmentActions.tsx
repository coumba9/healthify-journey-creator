import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Calendar, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  const handleReschedule = () => {
    toast({
      title: "Demande de report",
      description: "Votre demande de report a été envoyée au médecin.",
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé au médecin.",
    });
  };

  if (status === "cancelled") {
    return (
      <Button variant="outline" size="sm" onClick={handleReschedule}>
        <Calendar className="h-4 w-4 mr-1" />
        Replanifier
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      {status === "pending" && (
        <>
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
        </>
      )}
      {status === "confirmed" && (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-1" />
                Reporter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reporter le rendez-vous</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir reporter ce rendez-vous ? 
                  Le médecin sera notifié de votre demande.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleReschedule}>
                  Confirmer le report
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Envoyer un message</DialogTitle>
                <DialogDescription>
                  Envoyez un message au médecin concernant ce rendez-vous.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleMessage}>
                  Envoyer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default AppointmentActions;