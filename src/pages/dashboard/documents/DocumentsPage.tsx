import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DocumentManager from "@/components/dashboard/documents/DocumentManager";

const DocumentsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Documents Médicaux</h1>
        <DocumentManager />
      </div>
    </DashboardLayout>
  );
};

export default DocumentsPage;