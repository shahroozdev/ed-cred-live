import React from "react";

const PaginationSkeleton = () => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="flex gap-2">
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default PaginationSkeleton;
