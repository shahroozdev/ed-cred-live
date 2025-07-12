import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { Header } from "@/components/organisms";
import { ReactNode } from "react";

export const dynamic = 'force-dynamic';
const WithNavabarLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
    noRedirect:true,
  });

  return (
    <div className="relative w-screen min-h-screen">
      <Header user={user} />
      {children}
    </div>
  );
};

export default WithNavabarLayout;
