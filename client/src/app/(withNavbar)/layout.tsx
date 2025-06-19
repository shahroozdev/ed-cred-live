import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { Header } from "@/components/organisms";
import BrowserDetect from "@/lib/BrowserDetect";
import { ReactNode } from "react";

const WithNavabarLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
  });

  return (
    <div className="relative w-screen">
      <Header user={user} />
      <BrowserDetect>{children}</BrowserDetect>
    </div>
  );
};

export default WithNavabarLayout;
