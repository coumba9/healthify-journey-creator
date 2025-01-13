import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des Services</h1>
          <Button>Ajouter un service</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              name: "Cardiologie",
              doctors: 5,
              patients: 120,
              appointments: 45,
            },
            {
              name: "Pédiatrie",
              doctors: 3,
              patients: 80,
              appointments: 30,
            },
            {
              name: "Neurologie",
              doctors: 4,
              patients: 95,
              appointments: 38,
            },
            {
              name: "Dermatologie",
              doctors: 2,
              patients: 60,
              appointments: 25,
            },
          ].map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Médecins</p>
                      <p className="text-2xl font-bold">{service.doctors}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Patients</p>
                      <p className="text-2xl font-bold">{service.patients}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">RDV/mois</p>
                      <p className="text-2xl font-bold">{service.appointments}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="destructive" size="sm">
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;