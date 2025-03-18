
import { useParams } from "react-router-dom";

export interface DoctorProfileData {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  price: number;
  insurance: string[];
  availability: string[];
  availableTimes: string[];
  experience: number;
  education: string[];
  languages: string[];
  about: string;
}

export const useDoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  // These data should ideally come from an API
  const doctor: DoctorProfileData = {
    id: id || "",
    name: id === "1" ? "Dr. Smith" : id === "2" ? "Dr. Johnson" : id === "3" ? "Dr. Dubois" : "Dr. Leroy",
    specialty: id === "1" ? "Cardiologie" : id === "2" ? "Pédiatrie" : id === "3" ? "Médecine générale" : "Dermatologie",
    rating: id === "1" ? 4.8 : id === "2" ? 4.5 : id === "3" ? 4.9 : 4.7,
    location: id === "1" || id === "3" ? "Paris" : id === "2" ? "Lyon" : "Marseille",
    price: id === "1" ? 50 : id === "2" ? 45 : id === "3" ? 35 : 55,
    insurance: id === "1" ? ["MGEN", "Harmonie Mutuelle"] : 
              id === "2" ? ["MAAF", "AXA"] : 
              id === "3" ? ["MGEN", "MAAF", "AXA"] : 
              ["Harmonie Mutuelle", "AXA"],
    availability: id === "1" ? ["2024-03-25", "2024-03-26"] : 
                id === "2" ? ["2024-03-24", "2024-03-27"] : 
                id === "3" ? ["2024-03-23", "2024-03-24", "2024-03-25"] : 
                ["2024-03-22", "2024-03-25", "2024-03-26"],
    availableTimes: id === "1" ? ["09:00", "10:00", "14:00", "15:00"] : 
                  id === "2" ? ["11:00", "13:30", "16:00"] : 
                  id === "3" ? ["08:30", "09:30", "10:30", "14:30", "15:30"] : 
                  ["10:00", "11:00", "14:00", "15:00", "16:00"],
    experience: id === "1" ? 15 : id === "2" ? 10 : id === "3" ? 20 : 8,
    education: ["Université de Médecine de Paris", "Formation spécialisée en Europe"],
    languages: ["Français", "Anglais"],
    about: "Médecin expérimenté avec une approche centrée sur le patient. Spécialisé dans le diagnostic et le traitement des pathologies complexes."
  };

  const formatAvailability = (dates: string[]) => {
    if (dates.length === 0) return "Aucune disponibilité";
    
    const sortedDates = [...dates].sort();
    
    return sortedDates.map(date => {
      const [year, month, day] = date.split('-');
      return `${day}/${month}`;
    }).join(', ');
  };

  return { doctor, formatAvailability };
};
