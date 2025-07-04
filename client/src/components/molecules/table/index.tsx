"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CustomTableProps } from "@/types";
import { useSearchParams } from "next/navigation";
import { usePRouter } from "@/hooks/useRouter";
import Pagination from "../pagination";

const CustomTable = ({
  data = [],
  columns = [],
  pagination,
  title,
  loading,
  total=0,
  currentPage = 1,
  pageSize = 10,
}: CustomTableProps) => {
  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState<any>({});

  const router = usePRouter();
  const searchParams = useSearchParams();

  const table = useReactTable({
    data:data??[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    ...(pagination && { getPaginationRowModel: getPaginationRowModel() }),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })??[]

  const nextPageHandle = () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("page", String(currentPage + 1));
    router.push(`?${queryParams.toString()}`);
  };

  const prevPageHandle = () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    const newPage = Math.max(1, currentPage - 1); // Prevent page < 1
    queryParams.set("page", String(newPage));
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        {title && <h1 className="font-semibold text-xl text-black">{title}</h1>}
      </div>
      <Table>
        <TableHeader className="bg-[#F9FAFB]">
          {table?.getHeaderGroups()?.map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup?.headers?.map((header: any, idx: number) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn("px-3 md:px-5 py-3 !text-[#6B7280]")}
                    style={{
                      minWidth: header.column.columnDef.size,
                      maxWidth: header.column.columnDef.size,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns?.length || 1}
                className="h-24 text-center"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows?.map((row: any) => (
              <TableRow
                key={row?.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell
                    key={cell.id}
                    className={"px-3 md:px-5 py-3"}
                    style={{
                      minWidth: cell.column.columnDef.size,
                      maxWidth: cell.column.columnDef.size,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns?.length || 1}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && (<Pagination total={total || table.getFilteredRowModel().rows.length} currentPage={currentPage} pageSize={pageSize}/>
        // <div className="flex items-center justify-end space-x-2 py-4 px-5">
        //   <div className="flex-1 text-sm text-muted-foreground">
        //     {total || table?.getFilteredRowModel()?.rows?.length} row(s)
        //   </div>
        //   <div className="space-x-2 flex items-center">
        //     <p className="text-sm text-muted-foreground">Page {currentPage} of {Math.ceil((total || table.getFilteredRowModel().rows.length) / pageSize)}</p>
        //     <Button
        //       variant="outline"
        //       size="sm"
        //       onClick={prevPageHandle}
        //       disabled={currentPage === 1}
        //     >
        //       Previous
        //     </Button>
        //     <Button
        //       variant="outline"
        //       size="sm"
        //       onClick={nextPageHandle}
        //       disabled={currentPage >= Math.ceil((total || table.getFilteredRowModel().rows.length) / pageSize)}
        //     >
        //       Next
        //     </Button>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default CustomTable;
