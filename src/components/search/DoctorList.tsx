
import { Doctor } from "./types";
import DoctorCard from "./DoctorCard";

interface DoctorListProps {
  doctors: Doctor[];
  isLoading: boolean;
  hasSearched: boolean;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorList = ({ 
  doctors, 
  isLoading, 
  hasSearched, 
  onBookAppointment 
}: DoctorListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {hasSearched && (
        <div className="mb-4">
          <p className="text-gray-600">
            {doctors.length} {doctors.length === 1 ? 'médecin trouvé' : 'médecins trouvés'}
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            onBookAppointment={() => onBookAppointment(doctor)}
          />
        ))}
      </div>

      {hasSearched && doctors.length === 0 && (
        <div className="text-center p-10 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-600">Aucun médecin ne correspond à vos critères de recherche.</p>
        </div>
      )}
    </>
  );
};

export default DoctorList;
