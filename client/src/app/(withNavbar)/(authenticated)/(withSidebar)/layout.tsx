import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { SideMenu } from "@/components/organisms";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
  });
  return (
    <>
      <div className="flex h-full w-full overflow-hidden">
        {user.role === "admin" ? <SideMenu /> : <></>}
        <SidebarInset className="flex-1 overflow-auto">{children}</SidebarInset>
      </div>
    </>
  );
}
