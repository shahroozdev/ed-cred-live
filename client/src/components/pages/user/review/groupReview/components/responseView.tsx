import { colorVariants } from "@/data/constant";
import dayjs from "dayjs";
import { AppleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { v4 } from "uuid";

const ResponseView = ({
  response,
  category,
}: {
  response: Record<string, any>;
  category?: string;
}) => {
  let totalRating = 0;
  let count = 0;
  response?.answers?.length > 0 &&
    response?.answers?.forEach((answer: any) => {
      if (Number.isInteger(Number(answer.answer))) {
        totalRating += Number(answer.answer);
        count++;
      }
    });
  const averageRating = Math.round(totalRating / (count === 0 ? 1 : count));
  return (
    <div className="w-full px-3 py-2 flex gap-2 cursor-pointer ">
      <div className="lg:block hidden w-32 h-24 px-2 border-r-[1px] border-solid">
        <Image
          src={`/images/${
            response?.isVerified ? "verifiedStamp" : "Review"
          }.png`}
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
              <b>Submitted on:</b>{" "}
              {dayjs(response?.submittedAt).format("MMM DD, YY")}
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
                    className={
                      i + 1 <= averageRating
                        ? colorVariants[category ?? "blue"]
                        : "text-gray-400 fill-gray-400 hover:fill-gray-300"
                    }
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
