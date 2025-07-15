import { TitleWrapper } from "@/components/atoms";
import FetchWithSuspension from "@/components/molecules/fetchWithSuspension";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { createPackageSchema } from "@/lib/schemas";
import TableSkeleton from "@/skeletons/tableSkeleton";
import React from "react";

const Packages = () => {
  return (
    <TitleWrapper title="All Packages">
      <FetchWithSuspension
        apiData={{ url: "/packages", key: "packages" }}
        suspension={<TableSkeleton title="All Packages" />}
      >
        {(data) => (
          <TableWithFilter
            noFilter
            title="All Packages"
            tableData={data}
            tableColumn={createPackageSchema}
            // tablePagination={true}
            // total={data?.total}
            // currentPage={data?.currentPage}
            // pageSize={data?.pageSize}
          />
        )}
      </FetchWithSuspension>
    </TitleWrapper>
  );
};

export default Packages;
