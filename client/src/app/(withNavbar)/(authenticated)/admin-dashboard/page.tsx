import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import { OverviewTab } from "@/components/pages/admin/dashboard/Overview";

const Dashboard = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const queryParams = new URLSearchParams(params);
  const feedbacks = await getServerSideDataWithFeatures({
    url: `/feedback-form?${queryParams.toString()}`,
    key: "feedbacksFormList",
  });
  const categories = await getServerSideDataWithFeatures({
    url: `/category`,
    key: "CategoriesList",
  });
  const posts = await getServerSideDataWithFeatures({
    url: `/posts`,
    key: "posts",
  });
  return (
    <TitleWrapper title={"Dashboard"} notBackBtn>
      <div className="font-inter flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <OverviewTab feedbacks={feedbacks} categories={categories} posts={posts}/>
        </div>
      </div>
    </TitleWrapper>
  );
};
export default Dashboard;
