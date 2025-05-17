"use client";
import { studentMaterialColumn } from "@/data/tableColumns";
import TableWithFilter from "../molecules/tableWithFilters";
import { CategoryFilterForm } from "@/data/forms";

export const CategoryTable = ({ data }: { data: Record<any, any> | null }) => {
 
  return (
    <div className="ring-2 ring-muted rounded-md p-4">
      <TableWithFilter
        form={CategoryFilterForm}
        title="Recent Categories"
        tableData={data?.categories}
        tableColumn={studentMaterialColumn}
        tablePagination={true}
        // loading={loading}
        searchBar
        total={data?.total}
        currentPage={data?.currentPage}
        pageSize={data?.pageSize}
      />
    </div>
  );
};
