"use client";
import { imagesUrls } from "@/types";
import { AppleIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      className="w-full border-2 border-muted rounded-md px-3 py-2 flex gap-2 shadow-md hover:scale-101 cursor-pointer min-h-[215px] transition-all duration-300 ease-in-out"
      onClick={() => router.push(`/response/${response?.id}`)}
    >
      {/* <div className="w-full h-full absolute flex justify-center items-center"> */}
      {/* </div>  */}
      {!noImage?<div className="md:block hidden w-32 h-32 p-4 border-r-[1px]">
        <Image
          src={`/uploads/categoryIcons/${
            imagesUrls[response?.groupType] ?? "pricipal"
          }.png`}
          width={600}
          height={600}
          alt={""}
          className="w-full h-full object-contain"
        />
      </div>:<></>}
      <div className="w-full relative">
        {!noImage?<Image
          src={"/images/VerifiedStamp.png"}
          className=" h-full opacity-15 max-w-[200px] w-auto absolute right-[35%]"
          width={1000}
          height={500}
          alt=""
        />:<></>}
        <div
          className={`flex ${
            mobile ? "flex-col" : "flex-col sm:flex-row"
          } justify-between w-full`}
        >
          <div>
            <div className="capitalize">
              <b>Category:</b>
              {response?.category?.name}
            </div>
            <div className="md:text-base text-sm font-normal">
              <b>School Name:</b> {response?.branch?.name}
            </div>
            <div className="md:text-base text-sm font-normal">
              <b>Reviewee Name:</b> {response?.name}
            </div>
            {response?.responses[0]?.comments ? (
              <div className="text-ellipsis line-clamp-1 italic font-light opacity-70">
                &ldquo;{response?.responses[0]?.comments}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-right">
              <div className="md:text-base text-sm flex gap-1 items-center justify-end">
                {response?.responses?.length} review
                {response?.responses?.length > 1 ? "s" : ""}
                <Image
                  src={"/images/VerifiedStamp.png"}
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="md:text-base text-sm text-muted-foreground font-normal">
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
              fill={i + 1 <= averageRating ? "red" : "gray"}
              stroke={i + 1 <= averageRating ? "red" : "gray"}
            />
          ))}
          <div className="text-base ml-2">{averageRating?.toFixed(0)}/5</div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
