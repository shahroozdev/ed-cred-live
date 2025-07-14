import { ArrowRight } from "lucide-react";
import React from "react";

const ForumCardSkeleton = () => {
  return (
    <div className="flex flex-col items-start sm:h-[500px] h-[600px] overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out justify-start gap-6 rounded-3xl border border-muted border-solid bg-background p-2 text-left shadow-lg shadow-[#b6b6b6]">
      <div className="w-full sm:min-h-[200px] sm:h-[200px] sm:max-h-[200px] min-h-[300px] h-[300px] max-h-[300px] border rounded-3xl border-solid animate-pulse bg-gray-200">
        <div />
      </div>
      <div className="text-xl font-[600] line-clamp-2 min-h-[55px] px-2 animate-pulse bg-gray-200 w-[90%] rounded-xl" />
      <div className="!px-2 !py-0 w-full">
        <div className="text-sm text-ellipsis md:line-clamp-2 line-clamp-1 italic font-light opacity-70 bg-gray-200 h-4 w-full mb-2 animate-pulse" />
        <div className="text-sm text-ellipsis md:line-clamp-2 line-clamp-1 italic font-light opacity-70 bg-gray-200 h-4 w-full mb-2 animate-pulse" />
        <div className="text-sm text-ellipsis md:line-clamp-2 line-clamp-1 italic font-light opacity-70 bg-gray-200 h-4 w-full mb-2 animate-pulse" />
        <div className="text-sm text-ellipsis md:line-clamp-2 line-clamp-1 italic font-light opacity-70 bg-gray-200 h-4 w-full mb-2 animate-pulse" />
      </div>
      <div className="group cursor-not-allowed flex gap-2 ml-2 px-2 py-2 rounded-md transition-all duration-300 ease-in-out bg-[#439e5e] border-[1px] border-[#439e5e] border-solid hover:bg-background hover:text-[#439e5e]  text-white">
        Read More <ArrowRight className="-rotate-45 group-hover:rotate-0" />
      </div>
    </div>
  );
};

export default ForumCardSkeleton;
