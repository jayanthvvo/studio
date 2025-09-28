import SupervisorAppSidebar from "@/components/layout/supervisor/sidebar";
import SupervisorHeader from "@/components/layout/supervisor/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SupervisorAppSidebar />
        <SidebarInset className="bg-background">
            <SupervisorHeader />
            <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
