"use client";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { adminForumColumn } from "@/data/tableColumns";
import React from "react";

const ViewALLForums = ({ data }: { data: Record<string, any> }) => {
  return (
    <TableWithFilter
      noFilter
      title="Forum List"
      tableData={data?.forums}
      tableColumn={adminForumColumn}
      tablePagination={true}
      // searchBar
      total={data?.total}
      currentPage={data?.currentPage}
      pageSize={data?.pageSize}
    />
  );
};

export default ViewALLForums;
