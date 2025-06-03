"use client";
import { imagesUrls } from "@/types";
import { AppleIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 } from "uuid";

const ResponseCard = ({
  response,
  hideRating = false,
}: {
  response: any;
  hideRating?: boolean;
}) => {
  let totalRating = 0;
  let totalResponses = 0;
  response?.responses.forEach((res: any) =>
    res.answers.forEach((answer: any) => {
      if (Number.isInteger(Number(answer.answer))) {
        totalRating += Number(answer.answer);
      }
    })
  );
  const averageRating = Math.round(totalRating / response?.responses?.length);

  return (
    <div
      className="w-full border-2 border-muted rounded-md px-3 py-2 flex gap-2 shadow-md hover:scale-101 cursor-pointer transition-all duration-300 ease-in-out"
      //   href={`/response/${response?.id}`}
    >
      <div className="md:block hidden w-32 h-32 p-4 border-r-[1px]">
        <Image
          src={`/uploads/categoryIcons/${
            imagesUrls[response?.groupType] ?? "pricipal"
          }.png`}
          width={600}
          height={600}
          alt={""}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div>
            <div className="text-lg font-semibold capitalize">
              {response?.groupType}
            </div>
            {response.details?.schoolName ? (
              <div className="md:text-base text-sm font-normal">
                School Name: {response?.details?.schoolName}
              </div>
            ) : (
              <></>
            )}
            {response.details?.pricipalName ? (
              <div className="md:text-base text-sm font-normal">
                Principal Name: {response.details.pricipalName}
              </div>
            ) : (
              <></>
            )}
            {response.details?.directorName ? (
              <div className="md:text-base text-sm font-normal">
                Director Name: {response.details.directorName}
              </div>
            ) : (
              <></>
            )}
            <div className="text-ellipsis line-clamp-1 italic">
              {response.comments}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-right">
              <div className="md:text-base text-sm">
                {response?.responses?.length} review
                {response?.responses?.length > 1 ? "s" : ""}
              </div>
              <div className="md:text-base text-sm text-muted-foreground font-normal">
                {response.details.schoolCountry}
              </div>
              <a
                href={response.details.schoolWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="md:text-base text-sm text-muted-foreground font-normal flex gap-2 items-center justify-end mt-auto"
              >
                {response.details.schoolWebsite}
                <ExternalLinkIcon stroke="gray" size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center justify-end">
          {Array.from({ length: 10 }).map((_, i) => (
            <AppleIcon
              key={v4()}
              size={16}
              fill={i + 1 < averageRating ? "red" : "gray"}
              stroke={i + 1 < averageRating ? "red" : "gray"}
            />
          ))}
          <div className="text-base ml-2">{averageRating.toFixed(0)}/10</div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
