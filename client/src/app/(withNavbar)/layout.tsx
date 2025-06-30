import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { Header } from "@/components/organisms";
import BrowserDetect from "@/lib/BrowserDetect";
import { ReactNode } from "react";

export const dynamic = 'force-dynamic';
const WithNavabarLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
    noRedirect:true,
  });

  return (
    <div className="relative w-screen">
      <Header user={user} />
      <BrowserDetect>{children}</BrowserDetect>
    </div>
  );
};

export default WithNavabarLayout;
