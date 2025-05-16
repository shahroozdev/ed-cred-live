"use client";
import { studentMaterialColumn } from "@/data/tableColumns";
import { useQuery } from "@/hooks/generalHooks";
import TableWithFilter from "../molecules/tableWithFilters";
import { CategoryFilterForm } from "@/data/forms";
import { FC } from "react"

export const CategoryTable:FC = () => {
  const { data, isLoading:loading } = useQuery({
    url: "/category",
    key: "categories",
  });
console.log(loading)
  return (
    <div className="ring-2 ring-muted rounded-md p-4">
      {/* Filtering Bar */}
      <TableWithFilter
        form={CategoryFilterForm}
        title="Recent Categories"
        tableData={data?.categories}
        tableColumn={studentMaterialColumn}
        tablePagination={true}
        loading={loading}
        searchBar
      />
    </div>
  );
};
