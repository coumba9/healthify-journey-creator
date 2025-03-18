
import { Star } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";

interface DoctorProfileHeaderProps {
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
}

const DoctorProfileHeader = ({ name, specialty, rating, reviewCount }: DoctorProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="text-lg">{specialty}</CardDescription>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="font-bold">{rating}</span>
        </div>
        <p className="text-sm text-gray-500">{reviewCount} avis</p>
      </div>
    </div>
  );
};

export default DoctorProfileHeader;
