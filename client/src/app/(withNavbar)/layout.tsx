import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { AdminNavbar } from "@/components/Common/Navbar";
import Navbar from "@/components/Landing/Navbar";
import React, { ReactNode } from "react";

const WithNavabarLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
  });
  return (
    <div>
      {user.role !== "admin" ? (
        <Navbar user={user} />
      ) : (
        <AdminNavbar user={user} />
      )}
      {/* <div className="max-w-[1200px] m-auto md:p-5 p-2"> */}
      {children}
      {/* </div> */}
    </div>
  );
};

export default WithNavabarLayout;
