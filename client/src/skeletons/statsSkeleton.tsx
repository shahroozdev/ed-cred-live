import React from "react";

const StatsSkeleton = ({ length }: { length?: number }) => {
  return (
    <div className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4`}>
      {Array.from({ length: length || 4 }).map((stat, index) => (
        <div key={index} className="outline-muted my-4 flex flex-col gap-4 rounded-md p-4 shadow-sm outline-2">
          <div className="text-lg font-semibold animate-pulse h-4 w-30 bg-gray-50"/>
          <p className="text-muted-foreground text-base animate-pulse h-8 w-10 bg-gray-50"/>
          <div className="mt-4 text-3xl font-semibold"/>
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
