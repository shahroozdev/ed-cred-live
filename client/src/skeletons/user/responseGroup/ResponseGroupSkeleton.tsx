import { Separator } from "@/components/ui/separator";
import ResponseCardSkeleton from "@/skeletons/responseCard";
import React from "react";

const ResponseGroupSkeleton = () => {
  return (
    <>
      <div className="lg:col-span-4 col-span-3">
        {Array.from({ length: 3 })?.map((_, i) => (
          <ResponseCardSkeleton mobile noImage key={i} />
        ))}
      </div>
      <div className="rounded-xl shadow-md lg:col-span-1 col-span-2 p-2">
        <h2 className="py-2 font-bold">Related Reviews</h2>
        <Separator className="mb-2" />
        <div className="space-y-2">
          {Array.from({ length: 3 })?.map((_, i) => (
            <ResponseCardSkeleton mobile noImage key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ResponseGroupSkeleton;
