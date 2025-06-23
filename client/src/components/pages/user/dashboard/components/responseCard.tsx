"use client";
import { imagesUrls } from "@/types";
import { AppleIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { v4 } from "uuid";

const ResponseCard = ({
  response,
  mobile,
}: {
  mobile?: boolean;
  response: any;
  hideRating?: boolean;
}) => {
  const router = useRouter();
  let totalRating = 0;
  response?.responses &&
    response?.responses?.forEach((res: any) =>
      res.answers.forEach((answer: any) => {
        if (Number.isInteger(Number(answer.answer))) {
          totalRating += Number(answer.answer);
        }
      })
    );
  const averageRating = Math.round(totalRating / response?.responses?.length);
  console.log(response);
  return (
    <div
      className="w-full border-2 border-muted rounded-md px-3 py-2 flex gap-2 shadow-md hover:scale-101 cursor-pointer transition-all duration-300 ease-in-out"
      onClick={() => router.push(`/response/${response?.responses[0]?.id}`)}
    >
      {/* <div className="w-full h-full absolute flex justify-center items-center"> */}
      {/* </div>  */}
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
      <div className="w-full relative">
        <Image
          src={"/images/VerifiedStamp.png"}
          className=" h-full opacity-15 max-w-[200px] w-auto absolute right-[35%]"
          width={1000}
          height={500}
          alt=""
        />
        <div
          className={`flex ${
            mobile ? "flex-col" : "flex-col sm:flex-row"
          } justify-between w-full`}
        >
          <div>
            <div className="text-lg font-semibold capitalize">
              {response?.groupType ||
                response?.responses[0]?.feedbackForm?.category?.name}
            </div>
            <div className="md:text-base text-sm font-normal">
              <b>School Name:</b> {response?.branch?.name}
            </div>
            <div className="md:text-base text-sm font-normal">
              <b>Reviewee Name:</b> {response?.name}
            </div>
            <div className="text-ellipsis line-clamp-1 italic">
              {response?.responses[0]?.comments}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-right">
              <div className="md:text-base text-sm flex gap-1 items-center">
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
