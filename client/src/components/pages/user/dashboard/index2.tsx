import React from "react";
import { SearchBar } from "./components";
import { TimerIcon } from "lucide-react";
import FilterDrawer from "./components/filterDrawer";
import ResponseCard from "./components/responseCard";
import FilterForm from "./components/filterForm";
import { Pagination } from "@/components/molecules";

const DashboardView2 = ({ data }: { data: Record<string, any> }) => {
  return (
    <>
      {data?.employees?.length === 0 ? (
        <div className="w-full h-full text-center col-span-3">
          No reviews found
        </div>
      ) : (
        <div className="space-y-4">
          {data?.employees?.map((review: any, i: number) => (
            <ResponseCard response={review} key={i} />
          ))}
          <Pagination
            total={data?.total}
            pageSize={data?.pageSize}
            currentPage={data?.currentPage}
          />
        </div>
      )}
    </>
  );
};

export default DashboardView2;
