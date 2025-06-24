import { imagesUrls } from "@/types";
import dayjs from "dayjs";
import { AppleIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { v4 } from "uuid";

const ResponseView = ({ response }: any) => {
  let totalRating =0;
  let count=0;
      response.answers.forEach((answer: any) => {
      if (Number.isInteger(Number(answer.answer))) {
        totalRating += Number(answer.answer);
        count++
      }
    })
  const averageRating = Math.round(totalRating / count);

  return (
    <div className="w-full px-3 py-2 flex gap-2 cursor-pointer ">
      <div className="lg:block hidden w-32 h-24 px-2 border-r-[1px]">
        <Image
          src={`/images/verifiedStamp.png`}
          width={600}
          height={600}
          alt={""}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full p-2">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div>
            <div className="md:text-base text-sm font-normal">
              <b>Submitted on:</b> {dayjs(response?.submittedAt).format("MMM DD, YY")}
            </div>
            {response?.details?.reportingPeriod ? (
              <div className="md:text-base text-sm font-normal">
                <b>Reporting Period:</b> {response?.details?.reportingPeriod}
              </div>
            ) : (
              <></>
            )}
            <div className="md:text-base text-sm font-normal flex">
              <div className="flex gap-1 items-center justify-end">
                {Array.from({ length: 5 }).map((_, i) => (
                  <AppleIcon
                    key={v4()}
                    size={16}
                    fill={i + 1 <= averageRating ? "red" : "gray"}
                    stroke={i + 1 <= averageRating ? "red" : "gray"}
                  />
                ))}
                <div className="text-base ml-2">
                  {averageRating?.toFixed(0)}/5
                </div>
              </div>
            </div>
            {response?.comments ? (
              <div className="md:text-base text-sm font-normal">
                <b>Comment:</b> {response?.comments}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseView;
