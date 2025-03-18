
import { useState, useEffect } from "react";

export interface DoctorProfileData {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  price: number;
  insurance: string[];
  experience: number;
  education: string[];
  languages: string[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  schedules: {
    days: string;
    hours: string;
  }[];
}

export const useDoctorProfileData = (doctorId: string) => {
  const [doctor, setDoctor] = useState<DoctorProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchDoctor = () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration
        const mockDoctor: DoctorProfileData = {
          id: doctorId,
          name: "Dr. Smith",
          specialty: "Cardiologie",
          location: "123 Rue de la Santé, Paris",
          rating: 4.8,
          price: 50,
          insurance: ["MGEN", "Harmonie Mutuelle"],
          experience: 15,
          education: [
            "Faculté de Médecine de Paris",
            "Spécialisation en Cardiologie",
          ],
          languages: ["Français", "Anglais"],
          reviews: [
            {
              id: "1",
              author: "Jean D.",
              rating: 5,
              comment: "Excellent médecin, très à l'écoute",
              date: "2024-03-15"
            }
          ],
          schedules: [
            { days: "Lundi - Vendredi", hours: "9:00 - 18:00" }
          ]
        };

        setDoctor(mockDoctor);
        setIsLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données du médecin");
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleBookAppointment = () => {
    // Implementation for booking appointment
    console.log(`Booking appointment with doctor ${doctorId}`);
    // Additional logic can be added here
  };

  return { doctor, isLoading, error, handleBookAppointment };
};
