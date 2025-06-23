import React from "react";
import { SearchBar } from "./components";
import { FilterXIcon, TimerIcon } from "lucide-react";
import FilterDrawer from "./components/filterDrawer";
import ResponseCard from "./components/responseCard";
import FilterForm from "./components/filterForm";

const DashboardView2 = ({ data }: { data: Record<string, any> }) => {

  const responsesGroup = data?.branches?.flatMap((item:Record<string, any>)=>(item?.employees))??[]

  return (
    <div>
      <SearchBar />
      <section className="flex gap-2">
        <aside className="border-[1px] rounded-md p-4 mt-4 w-full shadow-xl">
          <div className="text-muted-foreground justify-between flex gap-2 w-full my-4">
            <div className="flex gap-2 font-semibold sm:text-lg text-base items-center">
              <TimerIcon />
              Recent Reviews
            </div>
            <div className="lg:hidden block">
            <FilterDrawer />
            </div>
          </div>
          {data?.branches?.length === 0 ? (
            <div className="w-full h-full text-center col-span-3">
              No reviews found
            </div>
          ) : (
            <div className="space-y-4">
              {responsesGroup?.map((review: any, i: number) => (
                <ResponseCard response={review} key={i} />
              ))}
            </div>
          )}
        </aside>
        <aside className="lg:block hidden border-[1px] rounded-md mt-4 w-[300px] max-h-[500px] shadow-xl">
          <FilterForm />
        </aside>
      </section>
    </div>
  );
};

export default DashboardView2;
