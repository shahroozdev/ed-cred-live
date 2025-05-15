import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Common/Navbar";
import { SideMenu } from "@/components/Common/SideMenu";

export default function Layout({ children }: { children: any }) {
    return (
        <SidebarProvider>
            <SideMenu />
            <SidebarInset>
                <Navbar />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
