"use client";
import { AppleIcon } from "lucide-react";
import { useQuery } from "@/hooks/generalHooks";
import { Slider } from "@/components/molecules";
import ResponseCard from "../../common/user/dashboard/components/responseCard";

const Feedbacks = () => {
  const res = useQuery({
    url: "/feedback-form/groups",
    key: "feedbackFormForGroups",
  });
  const feedbacks = res?.data?.result;
  console.log(feedbacks, res);
  const breakpoints = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2 },
  };
  return (
    <div className="my-20 flex h-auto w-full flex-col items-center justify-center px-3 py-2  gap-14 md:my-40 max-w-[1200px] m-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-3xl font-[400] md:text-4xl">
          Recent <span className="font-[700]">Feedbacks</span>
        </div>
        <div className="text-sm md:text-base">
          See how our forum is making an impact!
        </div>
      </div>
      <Slider
        slides={feedbacks}
        className="relative flex justify-center w-full !p-2"
        breakpoints={breakpoints}
        spaceBetween={20}
        notShowArrow
      >
        {(slide) => <ResponseCard response={slide} mobile/>}
      </Slider>
      {/* <div className="flex flex-col items-center justify-center gap-4 px-10 md:w-2/3 md:flex-row md:gap-14 md:p-0 ">
                {
                   feedbacks?.length>0&& feedbacks?.map((feedback:any, index:number) => <Card name={feedback?.details?.schoolName} desc={feedback?.details?.schoolCountry} review={feedback?.comments} color={colors[index]} key={`card-${index}`} />)
                }
            </div> */}
    </div>
  );
};

const Card = ({ name, desc, review, color }: any) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg md:w-1/4">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="text-xl font-[600]">{name}</div>
        <div className="font-[400] text-[#374151] text-ellipsis line-clamp-3">
          {desc}
        </div>
      </div>
      <div className="font-[400] text-ellipsis line-clamp-2">{review}</div>
      <div className="flex gap-2 mt-auto">
        {Array.from({ length: 5 }).map((_, idx) => (
          <AppleIcon
            fill={idx < 4 ? color : "transparent"}
            stroke={color}
            key={`apple-${idx}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
