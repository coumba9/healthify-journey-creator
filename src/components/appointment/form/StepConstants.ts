
export interface Step {
  id: number;
  title: string;
  icon: string;
}

export const FORM_STEPS: Step[] = [
  { id: 1, title: "Informations personnelles", icon: "👤" },
  { id: 2, title: "Type de consultation", icon: "🏥" },
  { id: 3, title: "Date et heure", icon: "📅" },
  { id: 4, title: "Informations médicales", icon: "📋" },
  { id: 5, title: "Paiement", icon: "💳" },
];
