import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Paramètres du système</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration générale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nom du site</Label>
                <Input id="siteName" defaultValue="Clinique Santé+" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Email administrateur</Label>
                <Input id="adminEmail" type="email" defaultValue="admin@clinique.fr" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportPhone">Téléphone support</Label>
                <Input id="supportPhone" defaultValue="+33 1 23 45 67 89" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Double authentification</Label>
                  <p className="text-sm text-gray-600">
                    Activer la double authentification pour tous les utilisateurs
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verrouillage automatique</Label>
                  <p className="text-sm text-gray-600">
                    Verrouiller les comptes après 3 tentatives échouées
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode maintenance</Label>
                  <p className="text-sm text-gray-600">
                    Activer le mode maintenance du site
                  </p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Sauvegarde</Label>
                <div className="flex gap-4">
                  <Button variant="outline">Sauvegarder maintenant</Button>
                  <Button variant="outline">Restaurer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Annuler</Button>
          <Button>Enregistrer les modifications</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;