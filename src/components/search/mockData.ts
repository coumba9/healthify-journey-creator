
import { Doctor } from "./types";

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Smith",
    specialty: "cardiologie",
    location: "Paris",
    rating: 4.8,
    price: 50,
    insurance: ["MGEN", "Harmonie Mutuelle"],
    availability: ["2024-03-25", "2024-03-26"],
    availableTimes: ["09:00", "10:00", "14:00", "15:00"],
    experience: 15,
    image: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: "2",
    name: "Dr. Johnson",
    specialty: "pediatrie",
    location: "Lyon",
    rating: 4.5,
    price: 45,
    insurance: ["MAAF", "AXA"],
    availability: ["2024-03-24", "2024-03-27"],
    availableTimes: ["11:00", "13:30", "16:00"],
    experience: 10,
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: "3",
    name: "Dr. Dubois",
    specialty: "generaliste",
    location: "Paris",
    rating: 4.9,
    price: 35,
    insurance: ["MGEN", "MAAF", "AXA"],
    availability: ["2024-03-23", "2024-03-24", "2024-03-25"],
    availableTimes: ["08:30", "09:30", "10:30", "14:30", "15:30"],
    experience: 20,
    image: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    id: "4",
    name: "Dr. Leroy",
    specialty: "dermatologie",
    location: "Marseille",
    rating: 4.7,
    price: 55,
    insurance: ["Harmonie Mutuelle", "AXA"],
    availability: ["2024-03-22", "2024-03-25", "2024-03-26"],
    availableTimes: ["10:00", "11:00", "14:00", "15:00", "16:00"],
    experience: 8,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];
