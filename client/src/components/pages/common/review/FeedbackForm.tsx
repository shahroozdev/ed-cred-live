"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OctagonAlertIcon } from "lucide-react";
import { toast } from "sonner";
import { createFeedbackResponse } from "@/api/feedback-response";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SchoolForm from "./components/schoolForm";
import QuestionList from "./components/questionList";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { feedbackCreateResponseSchema } from "@/lib/schemas";
import { useMutate } from "@/hooks/generalHooks";

const FeedbackForm = ({feedback}: {feedback: Record<string, any>}) => {

  const { MutateFunc, isPending } = useMutate();

  const onSubmit = async (values: any) => {
    const body ={feedbackFormId: feedback.id, ...values}
    console.log(body)
    await MutateFunc({url:'/feedback-responses', method:'POST', body, sendTo:'/dashboard'})
  };
  // TODO: Bring the salary option on the end
  return (
    <FormTemplate
      onSubmit={onSubmit}
      className="w-full flex  flex-col gap-4 py-10 px-4"
      schema={feedbackCreateResponseSchema(feedback)}
      defaultValues={{
        details: Object.keys(feedback.details)
          .filter((key) => feedback.details[key])
          .reduce((acc:any, crr:string)=>{acc[crr]=""; return acc}, {}),
        answers:[],
        comments:""
      }}
    >
      <SchoolForm feedback={feedback} />
      <QuestionList feedback={feedback} />
      <FormFeilds
        fieldProps={{
          name: `comments`,
          className: "y-8 space-y-2",
        }}
        label={{
          text: (
            <>
              <div>Please add your comments below</div>
              <div className="text-muted-foreground text-sm">
                Feedback with comments takes top priority!
              </div>
            </>
          ),
          className: "flex flex-col items-start gap-1",
        }}
      >
        {(field) => <Textarea {...field} onChange={field.onChange} />}
      </FormFeilds>
      {/* AI Review Warning */}
      <div
        className={cn(
          "bg-destructive/10 dark:bg-destructive/20 border-destructive-foreground",
          "text-destructive-foreground flex gap-2 rounded-md p-4 text-sm"
        )}
      >
        <OctagonAlertIcon size={18} />
        <div>
          Please avoid submitting AI-generated reviews. The human experience is
          what Ed Cred is all about!
        </div>
      </div>

      {/* Submission Terms */}
      <div className="text-sm text-muted-foreground">
        Conditions of Submission: Your School Review is anonymous, even to us at
        ISR. We cannot delete, change, or edit Reviews. Submission is
        irreversible. By clicking the Submit button, you confirm that you AGREE
        to abide by our Terms of Use.
      </div>

      {/* Submit Button */}
      <Button variant="primary" loading={isPending}>
        Submit Feedback
      </Button>
    </FormTemplate>
  );
};

export default FeedbackForm;
