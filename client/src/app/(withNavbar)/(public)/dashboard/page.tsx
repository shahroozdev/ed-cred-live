import { TitleWrapper } from "@/components/atoms";
import FetchWithSuspension from "@/components/molecules/fetchWithSuspension";
import { SearchBar } from "@/components/pages/user/dashboard/components";
import FilterDrawer from "@/components/pages/user/dashboard/components/filterDrawer";
import FilterForm from "@/components/pages/user/dashboard/components/filterForm";
import DashboardView2 from "@/components/pages/user/dashboard/index2";
import DashboardSkeleton from "@/skeletons/user/dashboard/DashboardSkeleton";
import { TimerIcon } from "lucide-react";
import React from "react";

const PageDashboard = ({ searchParams }: any) => {
  return (
    <TitleWrapper title={"Dashboard"} notBackBtn>
      <div>
        <SearchBar />
        <section className="flex gap-2">
          <aside className="border-[1px] border-solid rounded-md p-4 mt-4 w-full shadow-xl">
            <div className="text-muted-foreground justify-between flex gap-2 w-full my-4">
              <div className="flex gap-2 font-semibold sm:text-lg text-base items-center">
                <TimerIcon />
                Recent Reviews
              </div>
              <div className="lg:hidden block">
                <FilterDrawer />
              </div>
            </div>
            <FetchWithSuspension
              apiData={{
                url: `/school/employees`,
                key: "feedbackFormForGroups",
              }}
              searchParams={searchParams}
              suspension={<DashboardSkeleton />}
            >
              {(data) => <DashboardView2 data={data} />}
            </FetchWithSuspension>
          </aside>
          <aside className="lg:block hidden border-[1px] border-solid rounded-md mt-4 w-[300px] max-h-[500px] shadow-xl">
            <FilterForm />
          </aside>
        </section>
      </div>
    </TitleWrapper>
  );
};

export default PageDashboard;
