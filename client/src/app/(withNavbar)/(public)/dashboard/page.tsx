import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import DashboardView2 from "@/components/pages/user/dashboard/index2";
import React from "react";

const PageDashboard = async ({ searchParams }: any) => {
  const filters = new URLSearchParams(
    Object.entries(await searchParams)
      .filter(([_, v]) => v !== undefined) // remove undefined
      .map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]) // take first if array
  ).toString();
  const data = await getServerSideDataWithFeatures({
    url: `/school/employees?${filters}`,
    key: "feedbackFormForGroups",
  });

  return (
    <TitleWrapper title={"Dasboard"} notBackBtn>
      <DashboardView2 data={data} />
    </TitleWrapper>
  );
};

export default PageDashboard;
