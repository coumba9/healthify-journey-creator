import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNav from "./DashboardNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardNav />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;