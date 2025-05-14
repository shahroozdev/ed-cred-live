import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import Navbar from "@/components/Landing/Navbar";
import React, { ReactNode } from "react";

const Layout = async({ children }: { children: ReactNode }) => {
  const user = await getServerSideDataWithFeatures({url:'/auth/profile', key:'profile'})
  return (
    <div>
      <Navbar user={user}/>
      <div className="max-w-[1400px] m-auto w-full sm:px-10 py-10 px-2">
      {children}
      </div>
    </div>
  );
};

export default Layout;
