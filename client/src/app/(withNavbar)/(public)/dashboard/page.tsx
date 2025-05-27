import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import UserDashboardPage from "@/components/pages/user/dashboard";
import React from "react";

const PageDashboard = async() => {
    const data = await getServerSideDataWithFeatures({
      url: "/feedback-form/groups",
      key: "feedbackFormForGroups",
    });
  return (
    <TitleWrapper title={"Dasboard"} notBackBtn>
      <UserDashboardPage data={data}/>
    </TitleWrapper>
  );
};

export default PageDashboard;
