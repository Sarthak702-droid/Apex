import DashboardHeader from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex">
      <DashboardSidebar />
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
          {children}
        </main>
      </div>
    </div>
  );
}
