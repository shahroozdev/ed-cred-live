"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { Textarea } from "@/components/ui/textarea";
import { useMutate } from "@/hooks/generalHooks";
import { replySchema } from "@/lib/schemas";
import React, { useState } from "react";

const CommentSection = ({ question }: { question: Record<string, any> }) => {
  const { MutateFunc, isPending } = useMutate();

  const reply = async (value: any) => {
    await MutateFunc({
      url: `/forum-reply`,
      method: "POST",
      body: {
        ...value,
        questionId: question?.id,
      },
    });
  };
  return (
    <FormTemplate
      schema={replySchema}
      onSubmit={reply}
      defaultValues={{ text: "" }}
      className="flex flex-col mt-20 gap-2"
    >
      <FormFeilds fieldProps={{ name: "text" }}>
        {(field) => (
           <Textarea {...field} className="w-full" onChange={field.onChange} placeholder="Send Comment"  rows={5}/>
        )}
      </FormFeilds>
      <div className="self-end">
        <Button loading={isPending} variant="primary" type="submit">
          answer
        </Button>
      </div>
    </FormTemplate>
  );
};

export default CommentSection;
