
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Appointment } from "@/types/appointment";

export const useAppointments = () => {
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

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredAppointments
  };
};
