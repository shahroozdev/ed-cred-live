import { TitleWrapper } from "@/components/atoms";
import UserDashboardPage from "@/components/pages/user/dashboard";
import React from "react";

const PageDashboard = () => {
  return (
    <TitleWrapper title={"Dasboard"} notBackBtn>
      <UserDashboardPage />
    </TitleWrapper>
  );
};

export default PageDashboard;
