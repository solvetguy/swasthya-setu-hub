import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center border-b border-border px-4 bg-card">
          <SidebarTrigger className="mr-4" />
          <span className="text-sm text-muted-foreground">Welcome back</span>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-background overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default DashboardLayout;
