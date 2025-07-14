import { AppleIcon, ExternalLinkIcon } from "lucide-react";
import React from "react";

const ResponseCardSkeleton = ({
  mobile,
  noImage,
}: {
  mobile?: boolean;
  noImage?: boolean;
}) => {
  return (
    <div className="w-full border-2 border-muted border-solid rounded-md px-3 py-2 !text-sm flex gap-2 shadow-md hover:scale-101 cursor-pointer min-h-[215px] transition-all duration-300 ease-in-out">
      {!noImage ? (
        <div className="md:block hidden w-32 h-32 p-4 border-r-[1px] border-solid">
          <div className="w-[100px] h-[100px] rounded-3xl animate-pulse bg-gray-200 " />
        </div>
      ) : (
        <></>
      )}
      <div className="w-full relative">
        <div
          className={`flex gap-4 ${
            mobile ? "flex-col" : "flex-col sm:flex-row"
          } justify-between w-full h-[90%]`}
        >
          <div className="w-full">
            <div className="capitalize flex gap-2 items-center">
              <b>Category:</b>
              <p className="bg-gray-200 h-4 w-10 animate-pulse" />
            </div>
            <div className=" text-sm font-normal flex gap-2 items-center">
              <b>School Name:</b> <p className="bg-gray-200 h-4 w-10 animate-pulse" />
            </div>
            <div className=" text-sm font-normal flex gap-2 items-center">
              <b>Reviewee Name:</b> <p className="bg-gray-200 h-4 w-10 animate-pulse" />
            </div>
            <div className="text-sm text-ellipsis md:line-clamp-2 line-clamp-1 italic font-light opacity-70 bg-gray-200 h-4 w-full mb-2 animate-pulse" />
            <div className="text-sm text-ellipsis md:line-clamp-2 line-clamp-1 italic font-light opacity-70 bg-gray-200 h-4 w-full mb-2 animate-pulse" />
            <div className="flex flex-col gap-2 items-end">
              <div className="text-right space-y-2">
                <div className="text-sm flex gap-1 items-center justify-end bg-gray-200 h-4 w-20 animate-pulse" />
                <div className="text-sm text-muted-foreground font-normal justify-end bg-gray-200 h-4 w-20 animate-pulse"></div>
                <div className="md:text-base text-sm text-muted-foreground bg-gray-200 font-normal flex gap-2 items-center justify-end mt-auto w-20 h-4 animate-pulse">
                  <ExternalLinkIcon stroke="gray" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center justify-end animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <AppleIcon key={i} size={16} fill={"#cacaca"} stroke={"#cacaca"} />
          ))}
          <div className="text-base ml-2 bg-gray-200 h-4 w-6 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ResponseCardSkeleton;
