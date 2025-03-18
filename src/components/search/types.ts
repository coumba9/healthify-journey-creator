
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  price: number;
  insurance: string[];
  availability: string[];
  experience: number;
  availableTimes?: string[];
  image?: string;
}
