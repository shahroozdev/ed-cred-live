import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const CommentsList = ({question}:{question:Record<string, any>}) => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <h2 className="font-bold text-xl">Comments:</h2>
      {question?.replies.map((reply:any) => (
        <div
          className="flex flex-col gap-0 p-4 outline outline-muted rounded-md"
          key={reply.id}
        >
          <div className="flex gap-4 items-center">
            <Avatar className="self-start">
              <AvatarFallback>
                {reply.author.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-blue-800 italic">{reply.author.username}</p>
            {reply.text}
            </div>
          </div>
          <span className="font-semibold lowercase text-muted-foreground text-sm self-end">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(reply.createdAt ?? new Date()))}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
