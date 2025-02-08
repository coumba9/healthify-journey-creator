import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MedicalInfoStepProps {
  formData: {
    reason: string;
    symptoms: string;
    allergies: string;
    currentMedications: string;
    documents: File[];
  };
  setFormData: (data: any) => void;
}

const MedicalInfoStep = ({ formData, setFormData }: MedicalInfoStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informations médicales</h3>
      
      <div className="space-y-2">
        <Label htmlFor="reason">Motif de consultation</Label>
        <Textarea
          id="reason"
          placeholder="Décrivez brièvement votre motif de consultation"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="symptoms">Symptômes actuels</Label>
        <Textarea
          id="symptoms"
          placeholder="Décrivez vos symptômes"
          value={formData.symptoms}
          onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies">Allergies connues</Label>
        <Textarea
          id="allergies"
          placeholder="Listez vos allergies"
          value={formData.allergies}
          onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentMedications">Médicaments actuels</Label>
        <Textarea
          id="currentMedications"
          placeholder="Listez les médicaments que vous prenez actuellement"
          value={formData.currentMedications}
          onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Documents médicaux</Label>
        <div className="border-2 border-dashed rounded-lg p-4 text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Glissez vos documents ici ou cliquez pour les sélectionner
          </p>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setFormData({ ...formData, documents: files });
            }}
          />
        </div>
        <p className="text-xs text-gray-500">
          Formats acceptés : PDF, JPG, PNG (max 10MB par fichier)
        </p>
      </div>
    </div>
  );
};

export default MedicalInfoStep;