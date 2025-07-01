"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import ChatInput from "./sendInput";
import DynamicView from "@/components/atoms/uploadFiles/dynamicView";
import { time } from "console";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const Timeline = ({
  timelineData,
  role,
}: {
  timelineData: Record<string, any>;
  role: string;
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when timelineData changes
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [timelineData?.timeline]);
  const user = timelineData?.disputedBy;
  return (
    <>
      {role==='admin'?<Card>
        <CardHeader className="font-bold">Disputed By</CardHeader>
        <Separator/>
        <CardContent>
          <div className="flex gap-4 items-center">
          <div className="relative w-20 h-20 min-w-18 min-h-18 ">
        {user.profilePictureUrl ? (
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image
              src={process.env.BASE_URL + user.profilePictureUrl}
              alt={`{user?.username} | ED-Cred`}
              width={500}
              height={500}
              className={"w-full h-full"}
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-full bg-foreground flex items-center justify-center text-background">
            {user?.username?.slice(0, 2)}
          </div>
        )}
        </div>
        <div className="p-2">
          <p><b>Email:</b>{"  "}{user?.email}</p>
          <p><b>Username:</b>{"  "}{user?.username}</p>
        </div>
        </div>
        </CardContent>
      </Card>:<></>}
      <div className="w-full p-4 space-y-4 border-2 my-4 border-muted rounded-md max-h-[500px] min-h-[500px] h-full shadow-md">
        <h2 className="text-lg font-semibold mb-4">Dispute Timeline</h2>
        <Separator />
        <div
          className="space-y-3 relative max-h-[320px] h-[320px] overflow-y-auto p-2"
          ref={messagesContainerRef}
        >
          {timelineData?.timeline?.length > 0 ? (
            timelineData?.timeline?.map((msg: Record<string, any>) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg?.sender === "admin" ? "justify-start" : "justify-end",
                  role === "admin" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "max-w-xs px-4 py-2 rounded-lg shadow text-sm",
                    msg?.sender === "admin"
                      ? "bg-blue-100 text-blue-900"
                      : "bg-green-100 text-green-900"
                  )}
                >
                  <p className="mb-1 capitalize font-semibold italic">
                    {role === "admin"
                      ? msg?.sender === "user"
                        ? timelineData?.disputedBy?.username
                        : "You"
                      : msg?.sender === "admin"
                      ? "Admin"
                      : "You"}
                  </p>
                  {msg?.attachment && (
                    <div className="min-w-74 max-w-74 min-h-48 max-h-48 h-48 w-74 mb-2 bg-gray-200 rounded-md pb-6 p-1">
                      <DynamicView url={msg?.attachment} />
                    </div>
                  )}
                  <p>{msg?.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              no data found
            </div>
          )}
        </div>
        <ChatInput
          id={timelineData?.id}
          onSuccess={() => {
            if (messagesContainerRef.current) {
              messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
            }
          }}
        />
      </div>
    </>
  );
};

export default Timeline;
