// import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import FetchWithSuspension from "@/components/molecules/fetchWithSuspension";
import { OverviewTab } from "@/components/pages/admin/dashboard/Overview";
import AdminDashboardSkeleton from "@/skeletons/admin/dashboard/AdminDashboardSkeleton";

const Dashboard =  ({ searchParams }: { searchParams: any }) => {

  return (
    <TitleWrapper title={"Dashboard"} notBackBtn>
      <div className="font-inter flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <FetchWithSuspension
          suspension={<AdminDashboardSkeleton/>}
            apiData={[
              {
                url: `/feedback-form`,
                key: "feedbacksFormList",
              },
              {
                url: `/category`,
                key: "CategoriesList",
                noSearParams:true,
              },
              {
                url: `/posts`,
                key: "posts",
                noSearParams:true
              },
            ]}
            searchParams={searchParams}
          >
            {(data) => (
              <OverviewTab
                feedbacks={data[0]}
                categories={data[1]}
                posts={data[2]}
              />
            )}
          </FetchWithSuspension>
        </div>
      </div>
    </TitleWrapper>
  );
};
export default Dashboard;
