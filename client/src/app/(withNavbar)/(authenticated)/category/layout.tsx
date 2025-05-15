import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Common/Navbar";
import { SideMenu } from "@/components/Common/SideMenu";

export default function Layout({ children }: { children: any }) {
    return (
        <div className="max-w-screen w-screen min-w-screen overflow-x-hidden px-4">
        <SidebarProvider>
            <SideMenu />
            <SidebarInset>
                <Navbar />
                {children}
            </SidebarInset>
        </SidebarProvider>
        </div>
    );
}
