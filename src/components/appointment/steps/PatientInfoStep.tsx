import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { twilioService } from "@/services/twilioService";
import { AppointmentFormData } from "@/hooks/useAppointmentForm";

interface PatientInfoStepProps {
  formData: Pick<AppointmentFormData, 'name' | 'email' | 'phone' | 'forSomeoneElse' | 'beneficiaryName'>;
  setFormData: (data: any) => void;
  createAccount: boolean;
  setCreateAccount: (value: boolean) => void;
}

const PatientInfoStep = ({
  formData,
  setFormData,
  createAccount,
  setCreateAccount,
}: PatientInfoStepProps) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user, setFormData]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d\s+()]/g, '');
    let formattedValue = value;
    
    if (value.length > 0 && !value.startsWith('+') && !value.startsWith('00')) {
      if (!value.startsWith('221')) {
        formattedValue = `+221 ${value}`;
      } else {
        formattedValue = `+${value}`;
      }
    }
    
    setFormData({ ...formData, phone: formattedValue });
  };

  const validatePhoneNumber = () => {
    if (!formData.phone) return true;
    
    const formatted = twilioService['formatPhoneNumber'](formData.phone);
    return !!formatted;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informations du patient</h3>
      {!user && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+221 XX XXX XX XX"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              className={!validatePhoneNumber() ? "border-red-500" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Format: code pays + numéro (ex: +221 77 123 45 67)
            </p>
            {!validatePhoneNumber() && (
              <p className="text-xs text-red-500">
                Le format du numéro de téléphone est invalide
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="createAccount"
              checked={createAccount}
              onCheckedChange={(checked) => setCreateAccount(checked as boolean)}
            />
            <Label htmlFor="createAccount" className="text-sm">
              Créer un compte pour gérer mes rendez-vous
            </Label>
          </div>
        </div>
      )}
      
      {user && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+221 XX XXX XX XX"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={!validatePhoneNumber() ? "border-red-500" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Format: code pays + numéro (ex: +221 77 123 45 67)
            </p>
            {!validatePhoneNumber() && (
              <p className="text-xs text-red-500">
                Le format du numéro de téléphone est invalide
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="forSomeoneElse"
          checked={formData.forSomeoneElse}
          onCheckedChange={(checked) => 
            setFormData({ ...formData, forSomeoneElse: checked as boolean })
          }
        />
        <Label htmlFor="forSomeoneElse" className="text-sm">
          Prendre rendez-vous pour quelqu'un d'autre
        </Label>
      </div>
      
      {formData.forSomeoneElse && (
        <div className="space-y-2">
          <Label htmlFor="beneficiaryName">Nom du bénéficiaire</Label>
          <Input
            id="beneficiaryName"
            placeholder="Nom du bénéficiaire"
            value={formData.beneficiaryName}
            onChange={(e) => 
              setFormData({ ...formData, beneficiaryName: e.target.value })
            }
          />
        </div>
      )}
    </div>
  );
};

export default PatientInfoStep;
