import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AddPatientPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Patient ajouté",
      description: "Le nouveau patient a été ajouté avec succès.",
    });
    navigate("/dashboard/patients");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ajouter un nouveau patient</h1>
        <Card>
          <CardHeader>
            <CardTitle>Informations du patient</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nom complet
                </label>
                <Input id="name" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input id="email" type="email" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Téléphone
                </label>
                <Input id="phone" required />
              </div>
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium mb-1">
                  Date de naissance
                </label>
                <Input id="birthdate" type="date" required />
              </div>
              <Button type="submit" className="w-full">
                Ajouter le patient
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddPatientPage;