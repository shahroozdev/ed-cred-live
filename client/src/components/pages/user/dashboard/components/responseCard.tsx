"use client";
import { colors, colorScheme, colorVariants } from "@/data/constant";
import { usePRouter } from "@/hooks/useRouter";
import { AppleIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { v4 } from "uuid";

const ResponseCard = ({
  response,
  mobile,
  noImage,
}: {
  mobile?: boolean;
  response: any;
  hideRating?: boolean;
  noImage?:boolean;
}) => {
  const router = usePRouter();
  let totalRating = 0;
  let count = 0;

  response?.responses?.forEach((res: any) => {
    if (res?.avgRatting) {
      totalRating += Number(res?.avgRatting);
      count++;
    }
  });
  const averageRating = count > 0 ? Math.round(totalRating / count) : 0;

  return (
    <div
      className="w-full border-2 border-muted border-solid rounded-md px-3 py-2 !text-sm flex gap-2 shadow-md hover:scale-101 cursor-pointer min-h-[215px] transition-all duration-300 ease-in-out"
      onClick={() => router.push(`/response/${response?.id}`)}
    >
      {/* <div className="w-full h-full absolute flex justify-center items-center"> */}
      {/* </div>  */}
      {!noImage?<div className="md:block hidden w-32 h-32 p-4 border-r-[1px] border-solid">
        <Image
          src={`/uploads/categoryIcons/${response?.category?.iconUrl ?? "principal"}.png`}
          width={600}
          height={600}
          alt={""}
          className="w-full h-full object-contain"
          onError={(e:any)=>{
            e.target.src = "/uploads/categoryIcons/principal"
          }}
        />
      </div>:<></>}
      <div className="w-full relative">
        {/* {!noImage?<Image
          src={"/images/VerifiedStamp.png"}
          className=" h-full opacity-15 max-w-[200px] w-auto absolute right-[35%]"
          width={1000}
          height={500}
          alt=""
        />:<></>} */}
        <div
          className={`flex ${
            mobile ? "flex-col" : "flex-col sm:flex-row"
          } justify-between w-full h-[90%]`}
        >
          <div>
            <div className="capitalize">
              <b>Category:</b>
              {response?.category?.name}
            </div>
            <div className=" text-sm font-normal">
              <b>School Name:</b> {response?.branch?.name}
            </div>
            <div className=" text-sm font-normal">
              <b>Reviewee Name:</b> {response?.name}
            </div>
            {response?.responses?.[0]?.comments ? (
              <div className="text-sm text-ellipsis md:line-clamp-2 line-clamp-1 italic font-light opacity-70">
                &ldquo;{response?.responses[0]?.comments}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-right">
              <div className="text-sm flex gap-1 items-center justify-end">
                {response?.responses?.length} review
                {response?.responses?.length > 1 ? "s" : ""}
                {/* <Image
                  src={"/images/VerifiedStamp.png"}
                  width={20}
                  height={20}
                  alt=""
                /> */}
              </div>
              <div className="text-sm text-muted-foreground font-normal">
                {response?.branch?.country}
              </div>
              <a
                href={response?.branch?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="md:text-base text-sm text-muted-foreground font-normal flex gap-2 items-center justify-end mt-auto"
              >
                {response?.branch?.website}
                <ExternalLinkIcon stroke="gray" size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center justify-end">
          {Array.from({ length: 5 }).map((_, i) => (
            <AppleIcon
              key={v4()}
              size={16}
              className={i + 1 <= averageRating ? colorVariants[response?.category?.color??'blue'] :
                "text-gray-400 fill-gray-400 hover:fill-gray-300"}
              // fill={i + 1 <= averageRating ? (colors[response?.category?.name]??'#51a2ff') : "#cacaca"}
              // stroke={i + 1 <= averageRating ? (colors[response?.category?.name]??'#51a2ff') : "#cacaca"}
            />
          ))}
          <div className="text-base ml-2">{averageRating?.toFixed(0)}/5</div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
