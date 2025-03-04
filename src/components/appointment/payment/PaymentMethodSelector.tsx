
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type PaymentMethod = "wave" | "orange-money" | "moov-money" | "free-mobile";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const PaymentMethodSelector = ({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) => {
  const paymentMethods = [
    {
      id: "wave",
      name: "Wave",
      description: "Paiement sécurisé via Wave",
      logoSrc: "/wave-logo.png",
    },
    {
      id: "orange-money",
      name: "Orange Money",
      description: "Paiement sécurisé via Orange Money",
      logoSrc: "/orange-money-logo.png",
    },
    {
      id: "moov-money",
      name: "Moov Money",
      description: "Paiement sécurisé via Moov Money",
      logoSrc: "/moov-money-logo.png",
    },
    {
      id: "free-mobile",
      name: "Free Mobile Money",
      description: "Paiement sécurisé via Free Mobile Money",
      logoSrc: "/free-mobile-logo.png",
    },
  ];

  return (
    <RadioGroup
      value={selectedMethod}
      onValueChange={onMethodChange}
      className="grid gap-4"
    >
      <div>
        <Label className="text-base">Choisissez votre moyen de paiement</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className="relative cursor-pointer hover:border-primary-500 transition-colors"
          >
            <CardContent className="p-6">
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="absolute right-4 top-4"
              />
              <div className="flex items-center space-x-4">
                <img
                  src={method.logoSrc}
                  alt={method.name}
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div>
                  <Label htmlFor={method.id} className="text-base">
                    {method.name}
                  </Label>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </RadioGroup>
  );
};

export default PaymentMethodSelector;
