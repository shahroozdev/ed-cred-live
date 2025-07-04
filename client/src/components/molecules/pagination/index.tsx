'use client'
import { Button } from "@/components/atoms";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({
  total = 0,
  currentPage = 1,
  pageSize = 10,
}: {
  total: number;

  currentPage?: number;
  pageSize?: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isHaveNotPre = +currentPage === 1;
  const isHaveNotNext = +currentPage >= Math.ceil(total / +pageSize);
  const nextPageHandle = () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("page", String(+currentPage + 1));
    router.push(`?${queryParams.toString()}`);
  };

  const prevPageHandle = () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    const newPage = Math.max(1, +currentPage - 1); // Prevent page < 1
    queryParams.set("page", String(newPage));
    router.push(`?${queryParams.toString()}`);
  };
  return (
    <div className="flex items-center justify-end space-x-2 py-4 px-5">
      <div className="flex-1 text-sm text-muted-foreground">{total} row(s)</div>
      <div className="space-x-2 flex items-center">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {Math.ceil(total / +pageSize)}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={prevPageHandle}
          disabled={isHaveNotPre}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPageHandle}
          disabled={isHaveNotNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
