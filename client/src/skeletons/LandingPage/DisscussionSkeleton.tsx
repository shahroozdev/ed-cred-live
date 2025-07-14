import React from 'react'
import ForumCardSkeleton from '../ForumCardSkeleton'

const DisscussionSkeleton = () => {
  return (
        <div className="relative flex h-auto w-full flex-col items-center justify-center gap-14 mb-20 max-w-[1200px] m-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-max rounded-full bg-[#A1AF001A] px-4 py-2 font-sans text-sm font-[400] tracking-widest text-[#439E5E] md:text-base">
          LATEST INSIGHTS
        </div>
        <div className="text-3xl font-[400]">
          Recent <span className="font-bold">Discussion</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 items-center justify-center gap-8 w-full md:px-10 px-4 ">
        {Array.from({length:3})?.map((_, i) => (
          <ForumCardSkeleton key={`card-${i}`} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full bg-[#F5F8F3]"></div>
    </div>
  )
}

export default DisscussionSkeleton