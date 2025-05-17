import { Footer } from "@/components/organisms";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="max-w-[1400px] m-auto w-full sm:px-10 py-10 px-2">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
