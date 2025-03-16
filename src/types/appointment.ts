
export interface Appointment {
  id: string;
  date: string;
  time: string;
  patientId: string;
  patientName: string;
  doctorName?: string; // Rendu optionnel
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
