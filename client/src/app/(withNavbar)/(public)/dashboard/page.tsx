import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import DashboardView2 from "@/components/pages/common/user/dashboard/index2";
import React from "react";

const PageDashboard = async() => {
    const data = await getServerSideDataWithFeatures({
      url: "/feedback-form/groups",
      key: "feedbackFormForGroups",
    });
  return (
    <TitleWrapper title={"Dasboard"} notBackBtn>
      <DashboardView2  data={data}/>
    </TitleWrapper>
  );
};

export default PageDashboard;
