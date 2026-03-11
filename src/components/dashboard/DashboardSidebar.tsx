import {
  LayoutDashboard, User, FileText, Upload, QrCode, Bell,
  Users, Share2, Settings, Heart, LogOut, Stethoscope,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Health Profile", url: "/dashboard/profile", icon: User },
  { title: "Medical Records", url: "/dashboard/records", icon: FileText },
  { title: "Upload Reports", url: "/dashboard/upload", icon: Upload },
  { title: "Emergency QR", url: "/dashboard/qr", icon: QrCode },
  { title: "Medicine Reminders", url: "/dashboard/reminders", icon: Bell },
  { title: "Family Profiles", url: "/dashboard/family", icon: Users },
  { title: "Share Records", url: "/dashboard/share", icon: Share2 },
  { title: "Doctor Network", url: "/dashboard/doctors", icon: Stethoscope },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className={`flex items-center gap-2 p-4 ${collapsed ? "justify-center" : ""}`}>
          <Heart className="h-6 w-6 text-primary shrink-0" />
          {!collapsed && <span className="font-heading font-bold text-foreground text-lg">SwasthyaSetu</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <button
            onClick={() => { toast.info("Logged out"); navigate("/"); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
