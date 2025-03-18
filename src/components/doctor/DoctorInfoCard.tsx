
import { MapPin, Award, FileText, ShieldCheck, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DoctorProfileData } from "@/hooks/useDoctorProfile";

interface DoctorInfoCardProps {
  doctor: DoctorProfileData;
  formatAvailability: (dates: string[]) => string;
}

const DoctorInfoCard = ({ doctor, formatAvailability }: DoctorInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{doctor.name}</CardTitle>
            <CardDescription className="text-primary text-lg">{doctor.specialty}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3 w-3 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span>{doctor.rating}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">À propos</h3>
            <p className="text-gray-700">{doctor.about}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
              <span>{doctor.location}</span>
            </div>
            
            <div className="flex items-start gap-2">
              <Award className="h-5 w-5 text-primary-600 mt-0.5" />
              <span>{doctor.experience} ans d'expérience</span>
            </div>
            
            <div className="flex items-start gap-2">
              <FileText className="h-5 w-5 text-primary-600 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-medium">Formation</span>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {doctor.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-primary-600 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-medium">Mutuelles acceptées</span>
                <span className="text-sm text-gray-600">
                  {doctor.insurance.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Prochaines disponibilités</h3>
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-primary-600 mt-0.5" />
            <span>{formatAvailability(doctor.availability)}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-primary-600 mt-0.5" />
            <div className="flex flex-wrap gap-2">
              {doctor.availableTimes.map((time, index) => (
                <Badge key={index} variant="secondary">{time}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorInfoCard;
