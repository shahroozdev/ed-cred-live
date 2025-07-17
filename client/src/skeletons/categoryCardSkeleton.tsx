import React from "react";

const CategoryCardSkeleton = ({ width }: { width?: string }) => {
  return (
    <div
      className={`flex items-center justify-center gap-4 rounded-3xl border border-muted border-solid bg-background p-4 text-center shadow-md flex-col h-[270px] min-h-[270px] max-h-[270px] ${width}`}
    >
      <div>
        <div className="h-[100px] w-[100px] animate-pulse bg-gray-200 rounded-3xl" />
      </div>
      <div className="text-left md:text-center">
        <div className="text-xl font-[600] animate-pulse bg-gray-200 w-30 h-5" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
