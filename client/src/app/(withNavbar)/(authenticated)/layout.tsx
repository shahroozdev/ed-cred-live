import { SidebarInset } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { SideMenu } from "@/components/organisms";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
    noRedirect:true,
  });
  return (
    <>
      <div className="flex h-full w-full overflow-hidden">
        {user&&(user?.role === "admin" || user?.role === "super_admin") ? <SideMenu user={user} /> : <></>}
        <SidebarInset className="flex-1 overflow-auto">{children}</SidebarInset>
      </div>
    </>
  );
}
