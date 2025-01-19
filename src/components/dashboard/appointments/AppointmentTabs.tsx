import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppointmentTabsProps {
  children: React.ReactNode;
  defaultValue?: string;
}

const AppointmentTabs = ({ children, defaultValue = "upcoming" }: AppointmentTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="upcoming">Prochains rendez-vous</TabsTrigger>
        <TabsTrigger value="new">Nouveau rendez-vous</TabsTrigger>
        <TabsTrigger value="tickets">Mes tickets</TabsTrigger>
        <TabsTrigger value="preferences">Préférences de rappel</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default AppointmentTabs;