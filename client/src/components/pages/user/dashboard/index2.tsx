import React from "react";
import { SearchBar } from "./components";
import { TimerIcon } from "lucide-react";
import FilterDrawer from "./components/filterDrawer";
import ResponseCard from "./components/responseCard";
import FilterForm from "./components/filterForm";
import { Pagination } from "@/components/molecules";

const DashboardView2 = ({ data }: { data: Record<string, any> }) => {
console.log(data, 'data')
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
          {data?.employees?.length === 0 ? (
            <div className="w-full h-full text-center col-span-3">
              No reviews found
            </div>
          ) : (
            <div className="space-y-4">
              {data?.employees?.map((review: any, i: number) => (
                <ResponseCard response={review} key={i} />
              ))}
              <Pagination total={data?.total} pageSize={data?.pageSize} currentPage={data?.currentPage}/>
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
