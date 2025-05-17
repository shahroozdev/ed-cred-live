import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { Header } from "@/components/organisms";
import { ReactNode } from "react";

const WithNavabarLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
  });
  return (
    <div className="relative w-screen">
      <Header user={user} />
      {/* <div className="max-w-[1200px] m-auto md:p-5 p-2"> */}
      {children}
      {/* </div> */}
    </div>
  );
};

export default WithNavabarLayout;
