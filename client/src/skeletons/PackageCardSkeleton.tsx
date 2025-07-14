import { CircleCheckIcon } from "lucide-react";
import React from "react";

const PackageCardSkeleton = () => {
  return (
    <div
      className={`p-6 rounded-4xl flex flex-col shadow-md bg-white text-black gap-2`}
    >
      <div className="text-2xl font-semibold animate-pulse bg-gray-200 h-6 w-16" />
      <div className="text-base font-normal  animate-pulse bg-gray-200 h-4 w-full" />
      <div className="text-base font-normal animate-pulse bg-gray-200 h-4 w-full" />
      <div className="text-base font-normal animate-pulse bg-gray-200 h-4 w-full" />
      <div className="text-6xl font-semibold flex items-start gap-2 ">
        <span className="animate-pulse bg-gray-200 h-12 w-16" />
        <span className="animate-pulse bg-gray-200 h-4 w-16" />
      </div>
      <div className="w-full h-0.5 bg-black/40 rounded-full my-4" />
      <div className="flex flex-col gap-1 text-lg font-normal mb-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <div className="flex gap-2 items-center" key={`feature-${i}`}>
            <CircleCheckIcon
              fill="oklch(0.627 0.194 149.214)"
              stroke="white"
              className="!min-w-5 !min-h-5 w-5 h-5"
            />
            <p className="lg:text-base text-sm animate-pulse bg-gray-200 h-4 w-full" />
          </div>
        ))}
      </div>
      <button className="mt-auto rounded-xl text-white py-3 hover:shadow-md hover:opacity-90 cursor-pointer animate-pulse bg-gray-200 h-10 w-full" />
    </div>
  );
};

export default PackageCardSkeleton;
