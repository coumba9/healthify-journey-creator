import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "newPassword">("email");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi d'un code de réinitialisation
    toast({
      title: "Code envoyé",
      description: "Un code de réinitialisation a été envoyé à votre adresse email",
    });
    setStep("code");
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérifier le code (simulation)
    if (code === "123456") {
      setStep("newPassword");
    } else {
      toast({
        title: "Code incorrect",
        description: "Le code entré n'est pas valide",
        variant: "destructive",
      });
    }
  };

  const handleSubmitNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    // Simuler la mise à jour du mot de passe
    toast({
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été réinitialisé avec succès",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Réinitialisation du mot de passe
          </h2>
        </div>

        {step === "email" && (
          <form onSubmit={handleSubmitEmail} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Envoyer le code
            </Button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleSubmitCode} className="mt-8 space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Code de réinitialisation
              </label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Vérifier le code
            </Button>
          </form>
        )}

        {step === "newPassword" && (
          <form onSubmit={handleSubmitNewPassword} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Réinitialiser le mot de passe
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;