"use client";
import React from "react";
import CommentSection from "./components/commentSection";
import CommentsList from "./components/commentsList";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import HTMLContent from "@/components/atoms/htmlContent";

const ForumDetailComponent = ({
  question,
}: {
  question: Record<string, any>;
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full min-h-[500px] h-[500px] max-h-[500px] ">
        <Image
          src={
            question?.featureImageUrl
              ? process.env.BASE_URL + question?.featureImageUrl
              : "/images/no-image.png"
          }
          width={500}
          height={200}
          alt={"ADsdas"}
          className="w-full h-full rounded-3xl object-contain"
          onError={(event: any) => {
            event.target.srcset = "/images/no-image.png";
          }}
        />
      </div>
      <div className="font-semibold text-3xl">{question?.title}</div>
      <HTMLContent value={question?.text} className="mt-2" />
      <Separator className="my-4" />
      <div className="flex w-full justify-between">
        <div className="text-muted-foreground line-clamp-1 text-base">
          asked by{" "}
          <span className="font-semibold">{question?.author?.username}</span> on{" "}
          <span className="font-semibold lowercase">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(question?.createdAt ?? new Date()))}
          </span>
        </div>
        <div className="flex gap-2 self-end">
          <ThumbsDownIcon strokeWidth={1} className="hover:text-red-500" />
          <ThumbsUpIcon strokeWidth={1} className="hover:text-blue-500" />
        </div>
      </div>
      <CommentsList question={question} />
      <CommentSection question={question} />
    </div>
  );
};

export default ForumDetailComponent;
