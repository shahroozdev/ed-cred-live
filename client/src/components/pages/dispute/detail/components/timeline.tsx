import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";
import ChatInput from "./sendInput";

interface DisputeTimeline {
  id: number;
  message: string;
  sender: string;
  attachment?: string;
  createdAt: string;
}

const Timeline = ({timelineData}:{timelineData:DisputeTimeline[]}) => {

  const messages = [
    { id: 1, sender: "admin", text: "Hi there! How can I assist you today?" },
    { id: 2, sender: "user", text: "I have a question about my account." },
    { id: 3, sender: "admin", text: "Sure, please go ahead." },
    { id: 4, sender: "user", text: "Why is my feedback not visible?" },
  ];
  return (
    <>
      <div className="w-full p-4 space-y-4 border-2 my-4 border-muted rounded-md max-h-[400px] min-h-[400px] h-full relative overflow-y-auto shadow-md">
        <h2 className="text-lg font-semibold mb-4">Dispute Timeline</h2>
        <Separator />
        <div className="space-y-3 h-full">
          {timelineData?.length>0?timelineData?.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender === "admin" ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-xs px-4 py-2 rounded-lg shadow text-sm",
                  msg.sender === "admin"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-green-100 text-green-900"
                )}
              >
                <p className="font-medium mb-1 capitalize">{msg.sender}</p>
                <p>{msg.message}</p>
              </div>
            </div>
          )):<div className="flex items-center justify-center h-full">no data found</div>}
        </div>
      <ChatInput />
      </div>
    </>
  );
};

export default Timeline;
