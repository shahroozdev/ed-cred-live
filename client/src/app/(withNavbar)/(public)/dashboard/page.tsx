import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import DashboardView2 from "@/components/pages/user/dashboard/index2";
import React from "react";

const PageDashboard = async() => {
    const data = await getServerSideDataWithFeatures({
      url: "/school/branch",
      key: "feedbackFormForGroups",
    });
  return (
    <TitleWrapper title={"Dasboard"} notBackBtn>
      <DashboardView2  data={data}/>
    </TitleWrapper>
  );
};

export default PageDashboard;
