
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrescriptionCreatorProps {
  onSave: (patientName: string, medications: string[]) => void;
  onCancel: () => void;
  initialPatientName?: string;
  initialMedications?: string[];
  readOnly?: boolean;
}

const PrescriptionCreator = ({
  onSave,
  onCancel,
  initialPatientName = "",
  initialMedications = [],
  readOnly = false
}: PrescriptionCreatorProps) => {
  const { toast } = useToast();
  const [patientName, setPatientName] = useState(initialPatientName);
  const [medicationsText, setMedicationsText] = useState(initialMedications.join('\n'));

  const handleSave = () => {
    if (!patientName.trim()) {
      toast({
        title: "Nom du patient requis",
        description: "Veuillez indiquer le nom du patient",
        variant: "destructive"
      });
      return;
    }

    if (!medicationsText.trim()) {
      toast({
        title: "Prescription requise",
        description: "Veuillez ajouter au moins un médicament",
        variant: "destructive"
      });
      return;
    }

    const medications = medicationsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

    onSave(patientName, medications);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="patient-name" className="text-sm font-medium">
          Nom du patient
        </label>
        <Input
          id="patient-name"
          placeholder="Nom complet du patient"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          readOnly={readOnly}
          className={readOnly ? "bg-gray-100" : ""}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="medications" className="text-sm font-medium">
          Médicaments (un par ligne)
        </label>
        <Textarea
          id="medications"
          placeholder="Ex: Paracétamol 1000mg - 1 comprimé 3 fois par jour pendant 5 jours"
          value={medicationsText}
          onChange={(e) => setMedicationsText(e.target.value)}
          className="min-h-[200px]"
          readOnly={readOnly}
        />
      </div>
      
      {!readOnly && (
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Annuler
          </Button>
          <Button onClick={handleSave}>
            <FileCheck className="mr-2 h-4 w-4" />
            {initialMedications.length > 0 ? "Mettre à jour" : "Créer l'ordonnance"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PrescriptionCreator;
