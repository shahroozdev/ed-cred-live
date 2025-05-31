"use client";
import { cn } from "@/lib/utils";
import { OctagonAlertIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import SchoolForm from "./components/schoolForm";
import QuestionList from "./components/questionList";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { feedbackCreateResponseSchema } from "@/lib/schemas";
import { useMutate } from "@/hooks/generalHooks";
import { ChangeEvent } from "react";
import UploadFiles from "@/components/atoms/uploadFiles";

const FeedbackForm = ({ feedback }: { feedback: Record<string, any> }) => {
  const { MutateFunc, isPending } = useMutate();

  const onSubmit = async (values: any) => {
    const body = { feedbackFormId: feedback.id, ...values };
    console.log(body, values);
    await MutateFunc({
      url: "/feedback-responses",
      method: "POST",
      body,
      // sendTo: "/dashboard",
      allowMulti: true,
    });
  };
  // TODO: Bring the salary option on the end
  const attachmentSizeLimiter = (
    e: ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    // if(!e.target.files) return;
    const files: any = Array.from(e?.target?.files || []);
    const totalSize = files?.reduce(
      (acc: any, file: any) => acc + file.size,
      0
    );
    const maxSize = 5 * 1024 * 1024; // 5MB
    console.log(files);
    if (totalSize > maxSize) {
      alert("Total file size exceeds 5MB limit.");
      e.target.value = ""; // Reset the file input
      return;
    } else {
      field.onChange(files);
    }
  };
  return (
    <FormTemplate
      onSubmit={onSubmit}
      className="w-full flex  flex-col gap-4 py-10 px-4"
      schema={feedbackCreateResponseSchema(feedback)}
      defaultValues={{
        details: Object.keys(feedback.details)
          .filter((key) => feedback.details[key])
          .reduce((acc: any, crr: string) => {
            acc[crr] = "";
            return acc;
          }, {}),
        answers:
          feedback?.questions?.map((q: any) => ({
            questionId: q.id,
            question: q.text,
            answer: "",
          })) ?? [],
        comments: "",
        attachments: [],
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
      {/* <FormFeilds
        fieldProps={{
          name: `attachments`,
          className: "y-8 space-y-2",
        }}
        label={{
          text: "Attachments",
          className: "flex flex-col items-start gap-1",
        }}
      >
        {(field) => (
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.pdf,.doc,.docx"
            // {...field}
            onChange={(e) => {
              attachmentSizeLimiter(e, field);
            }}
          />
        )}
      </FormFeilds> */}
      <UploadFiles />
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
        {/* Conditions of Submission: Your School Review is anonymous, even to us at
        ISR. We cannot delete, change, or edit Reviews. Submission is
        irreversible. By clicking the Submit button, you confirm that you AGREE
        to abide by our Terms of Use. */}
        Before submitting your review to Ed-Cred, ensure it accurately reflects
        your feedback. All reviews are anonymous and final once submitted, and
        we cannot modify or delete them. If your review includes serious
        allegations (e.g., serious misconduct), you must provide supporting
        documentation; without it, the review cannot be published. Claims backed
        by official documentation will receive a "Verified Stamp" and be
        highlighted in bold. Use of profanity, offensive language, or
        inappropriate content will automatically result in the review being
        rejected and not published. Any uploaded documents will be securely
        stored for verification purposes only, not posted publicly, and will be
        transferred to an external hard drive for protection. By uploading
        documents, you grant Ed-Cred permission to view your name or your child
        {"’"}s name solely for verification purposes. All other student names
        must be redacted to maintain confidentiality.
      </div>

      {/* Submit Button */}
      <Button variant="primary" type={"submit"} loading={isPending}>
        Submit Feedback
      </Button>
    </FormTemplate>
  );
};

export default FeedbackForm;
