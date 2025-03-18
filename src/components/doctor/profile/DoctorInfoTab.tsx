
import { Award, Euro, MapPin } from "lucide-react";

interface DoctorInfoTabProps {
  location: string;
  price: number;
  experience: number;
  education: string[];
  languages: string[];
  insurance: string[];
}

const DoctorInfoTab = ({ 
  location, 
  price, 
  experience, 
  education, 
  languages, 
  insurance 
}: DoctorInfoTabProps) => {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-gray-400" />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-2">
        <Euro className="h-5 w-5 text-gray-400" />
        <span>{price}€ la consultation</span>
      </div>
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-gray-400" />
        <span>{experience} ans d'expérience</span>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">Formation</h3>
        <ul className="list-disc list-inside space-y-1">
          {education.map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Langues parlées</h3>
        <div className="flex gap-2">
          {languages.map((lang, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Mutuelles partenaires</h3>
        <div className="flex gap-2">
          {insurance.map((ins, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm"
            >
              {ins}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoTab;
