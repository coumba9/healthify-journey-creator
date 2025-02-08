import DoctorSearch from "@/components/search/DoctorSearch";

const DoctorsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Trouver un médecin</h1>
      <DoctorSearch />
    </div>
  );
};

export default DoctorsPage;