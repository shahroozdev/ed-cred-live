'use client'
import { Slider } from "@/components/molecules";
import React from "react";
import ResponseCardSkeleton from "../responseCard";

const ResponseSlideSkeleton = () => {
  const breakpoints = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2 },
  };
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center px-3 py-2  gap-14 mb-20 max-w-[1200px] mx-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-3xl font-[400] md:text-4xl">
          Recent <span className="font-[700]">Feedbacks</span>
        </div>
        <div className="text-sm md:text-base">
          See how our forum is making an impact!
        </div>
      </div>
      <Slider
        slides={Array.from({length:6})}
        className="relative flex justify-center w-full !p-2"
        breakpoints={breakpoints}
        spaceBetween={20}
        notShowArrow
      >
        {(slide) => <ResponseCardSkeleton/>}
      </Slider>
    </div>
  );
};

export default ResponseSlideSkeleton;
