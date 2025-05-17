import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import TitleWrapper from "@/components/atoms/titleWrapper";
import React, { ReactNode } from "react";

const DashboardLayout = async ({
  children,
  admin,
  user,
}: {
  children: ReactNode;
  admin: ReactNode;
  user: ReactNode;
}) => {
  const userData = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
  });
  return (
    <TitleWrapper title={"Dasboard"} notBackBtn>
      {userData?.role === "admin" ? admin : user}
      {children}
    </TitleWrapper>
  );
};

export default DashboardLayout;
