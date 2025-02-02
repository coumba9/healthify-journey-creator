import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  email: string;
  allergies: string;
  medicalHistory: string;
}

const PatientProfile = () => {
  const { toast } = useToast();
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    email: "",
    allergies: "",
    medicalHistory: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations Personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel>Prénom</FormLabel>
                <Input
                  value={patientInfo.firstName}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, firstName: e.target.value })
                  }
                  placeholder="Prénom"
                />
              </div>
              <div className="space-y-2">
                <FormLabel>Nom</FormLabel>
                <Input
                  value={patientInfo.lastName}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, lastName: e.target.value })
                  }
                  placeholder="Nom"
                />
              </div>
              <div className="space-y-2">
                <FormLabel>Date de naissance</FormLabel>
                <Input
                  type="date"
                  value={patientInfo.dateOfBirth}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, dateOfBirth: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <FormLabel>Téléphone</FormLabel>
                <Input
                  type="tel"
                  value={patientInfo.phone}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, phone: e.target.value })
                  }
                  placeholder="Numéro de téléphone"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <FormLabel>Adresse</FormLabel>
                <Input
                  value={patientInfo.address}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, address: e.target.value })
                  }
                  placeholder="Adresse complète"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={patientInfo.email}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, email: e.target.value })
                  }
                  placeholder="Email"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique Médical</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <FormLabel>Allergies</FormLabel>
              <Textarea
                value={patientInfo.allergies}
                onChange={(e) =>
                  setPatientInfo({ ...patientInfo, allergies: e.target.value })
                }
                placeholder="Listez vos allergies..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <FormLabel>Antécédents Médicaux</FormLabel>
              <Textarea
                value={patientInfo.medicalHistory}
                onChange={(e) =>
                  setPatientInfo({ ...patientInfo, medicalHistory: e.target.value })
                }
                placeholder="Décrivez vos antécédents médicaux..."
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full">
              Enregistrer les modifications
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;