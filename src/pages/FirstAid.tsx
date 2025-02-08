import { BackButton } from "@/components/ui/back-button";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, AlertTriangle, Heart, Stethoscope } from "lucide-react";

const FirstAid = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <BackButton />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Premiers Secours
          </h1>
          <p className="text-xl text-gray-600">
            Informations essentielles en cas d'urgence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-500" />
                Numéros d'urgence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>SAMU : 15</li>
                <li>Police : 17</li>
                <li>Pompiers : 18</li>
                <li>Numéro d'urgence européen : 112</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Gestes qui sauvent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Position latérale de sécurité (PLS)</li>
                <li>Massage cardiaque</li>
                <li>Bouche-à-bouche</li>
                <li>Utilisation d'un défibrillateur</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                Situations d'urgence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Arrêt cardiaque</li>
                <li>Hémorragie</li>
                <li>Brûlure</li>
                <li>Étouffement</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-500" />
                Conseils généraux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Garder son calme</li>
                <li>Sécuriser la zone</li>
                <li>Appeler les secours</li>
                <li>Suivre les instructions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FirstAid;