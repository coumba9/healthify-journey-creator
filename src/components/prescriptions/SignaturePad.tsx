import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SignaturePadProps {
  onSave: (signature: string) => void;
}

const SignaturePad = ({ onSave }: SignaturePadProps) => {
  const { toast } = useToast();
  let signaturePad: SignatureCanvas | null = null;

  const handleSave = () => {
    if (signaturePad) {
      if (!signaturePad.isEmpty()) {
        const signatureData = signaturePad.toDataURL();
        onSave(signatureData);
        toast({
          title: "Signature enregistrée",
          description: "L'ordonnance a été signée avec succès.",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Veuillez signer l'ordonnance avant de sauvegarder.",
          variant: "destructive",
        });
      }
    }
  };

  const handleClear = () => {
    if (signaturePad) {
      signaturePad.clear();
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 bg-white">
        <SignatureCanvas
          ref={(ref) => {
            signaturePad = ref;
          }}
          canvasProps={{
            className: "signature-canvas w-full h-40",
          }}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleClear} variant="outline">
          Effacer
        </Button>
        <Button onClick={handleSave}>Signer et Sauvegarder</Button>
      </div>
    </div>
  );
};

export default SignaturePad;