import AppointmentForm from "@/components/appointment/AppointmentForm";

const PatientSection = () => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold">Espace Patient</h3>
      <div className="grid gap-6">
        <div>
          <h4 className="text-xl font-medium mb-4">Prendre un rendez-vous</h4>
          <AppointmentForm />
        </div>
        <div>
          <h4 className="text-xl font-medium mb-4">Mes rendez-vous</h4>
          <p className="text-gray-600">Liste de vos rendez-vous à venir...</p>
        </div>
        <div>
          <h4 className="text-xl font-medium mb-4">Mon dossier médical</h4>
          <p className="text-gray-600">Accédez à votre historique médical...</p>
        </div>
      </div>
    </div>
  );
};

export default PatientSection;