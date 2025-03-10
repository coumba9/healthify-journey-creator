
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UMLDiagrams from "@/components/documentation/UMLDiagrams";

const Documentation = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Documentation Technique</h1>
        <UMLDiagrams />
      </div>
    </DashboardLayout>
  );
};

export default Documentation;
