import AuthGuard from "@/components/global/auth-guard";
import { SidebarProvider } from "@/common/context/sidebar-context";
import Sidebar from "@/components/global/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="screen app-shell on">
          <Sidebar />
          {children}
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
