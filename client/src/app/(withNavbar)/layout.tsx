import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import Navbar from "@/components/Landing/Navbar";
import React, { ReactNode } from "react";

const WithNavabarLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
  });
  return (
    <div>
      <Navbar user={user} />
        {children}
    </div>
  );
};

export default WithNavabarLayout;
