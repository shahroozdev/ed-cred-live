import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SideMenu } from "@/components/Common/SideMenu";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-full w-screen overflow-hidden">
          <SideMenu />
          <SidebarInset className="flex-1 overflow-auto">{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
