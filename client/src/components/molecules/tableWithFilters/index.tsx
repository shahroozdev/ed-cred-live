"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FilterXIcon, Search } from "lucide-react";

import { Button } from "@/components/atoms";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import CustomTable from "../table";
import CustomForm from "../customForm";

import { cn, getAllParam } from "@/lib/utils";
import { TableWithColumnProps } from "@/types";

const TableWithFilter: React.FC<TableWithColumnProps> = ({
  tableColumn,
  tableData=[],
  title,
  form,
  formComponent,
  tablePagination,
  noFilter,
  removeMainCSS,
  className,
  loading,
  searchBar,
  total,
  currentPage,
  pageSize,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onSubmit2 = (data: Record<string, any>) => {
    const queryParams = getAllParam(data);
    router.push(`?page=1&${queryParams}`);
  };

  const handleSearch = () => {
    const encodedSearch = encodeURIComponent(search);
    router.push(`?page=1&query=${encodedSearch}`);
  };

  return (
    <div
      className={cn(
        className,
        !removeMainCSS &&
          "shadow-[8px_8px_48px_0px_rgba(0,0,0,0.08)] rounded-xl border border-solid mb-5"
      )}
    >
      <div className="mt-3 flex items-center justify-between sm:px-4 px-2 mb-2">
        <div className="text-xl font-semibold flex items-center">{title}</div>
        {!noFilter && (
          <div className="flex h-fit items-center gap-5">
            <Button
              variant="ghost"
              icon={<FilterXIcon size={20} />}
              background="#F3F4F6"
              rounded={8}
              color="#4B5563"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              {showFilters ? "Cancel" : "Filter"}
            </Button>
          </div>
        )}
      </div>

      {showFilters && (
        <>
          <Separator className="my-3" />
          <div className="sm:px-4 px-2 transition-all duration-300 ease-in-out">
           {formComponent||<CustomForm props={{ ...form, onSubmit: onSubmit2 }} />}
          </div>
          <Separator className="my-3" />
        </>
      )}

      {searchBar && (
        <div className="w-full flex justify-end px-5 mb-2">
          <div className="flex items-center gap-2 border border-gray-300 border-solid rounded-md px-2 bg-white">
            <Input
              placeholder="Search title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 border-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 !bg-transparent focus:shadow-none appearance-none text-sm"
            />
            <Search
              className="text-gray-400 w-4 h-4 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>
      )}

      <div className="sm:px-4 px-2">
        <CustomTable
          data={tableData}
          columns={tableColumn}
          pagination={tablePagination}
          loading={loading}
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default TableWithFilter;
