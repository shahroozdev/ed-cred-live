"use client";
import { cn } from "@/lib/utils";
import { OctagonAlertIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import SchoolForm from "./components/schoolForm";
import QuestionList from "./components/questionList";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { feedbackCreateResponseSchema } from "@/lib/schemas";
import { useMutate } from "@/hooks/generalHooks";
import UploadFiles from "@/components/atoms/uploadFiles";
import Link from "next/link";

const FeedbackForm = ({
  feedback,
  defaultValues,
}: {
  feedback: Record<string, any>;
  defaultValues?: Record<string, any>;
}) => {
  const { MutateFunc, isPending } = useMutate();

  const onSubmit = async (values: any) => {
    const body = { ...(defaultValues?.id?{id:defaultValues?.id}:{}),feedbackFormId: feedback.id, ...values };

    await MutateFunc({
      url: "/feedback-responses",
      method: "POST",
      body,
      sendTo: defaultValues?.id?"/feedback":"/dashboard",
      allowMulti: true,
    });
  };
console.log(defaultValues, 'feedback')
const attachmentUrls =
  defaultValues?.attachments
    ?.replace(/[{}"]/g, "") // remove braces and quotes
    .split(",")
    .map((url:string) => url.trim())
    .filter((url:string) => url.length > 0) ?? [];
  return (
    <FormTemplate
      onSubmit={onSubmit}
      className="w-full flex  flex-col gap-4 py-2"
      schema={feedbackCreateResponseSchema(feedback)}
      defaultValues={{
        details: {
          revieweeName: defaultValues?.details?.revieweeName || "",
          schoolName: defaultValues?.details?.schoolName || "",
          country: defaultValues?.details?.country || "",
          website: defaultValues?.details?.website || "",
          divison: defaultValues?.details?.divison || "",
          reportingPeriod: defaultValues?.details?.reportingPeriod || "",
        },
        answers:
          feedback?.questions?.map((q: any) => ({
            questionId: q.id,
            question: q.text,
            answer: defaultValues
              ? defaultValues?.answers?.find(
                  (key: any) => Number(key?.questionId) === q?.id
                )?.answer
              : "",
          })) ?? [],
        comments: defaultValues?.comments ||"",
        attachments: [],
        agreeTerms: false,
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
      <UploadFiles urls={attachmentUrls}/>
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
        <b>Conditions of Submission: </b>Before submitting your review to
        Ed-Cred, ensure it accurately reflects your feedback. All reviews are
        anonymous and final once submitted, and we cannot modify or delete them.
        If your review includes serious allegations (e.g., serious misconduct),
        you must provide supporting documentation; without it, the review cannot
        be published. Claims backed by official documentation will receive a
        "Verified Stamp" and be highlighted in bold. Use of profanity, offensive
        language, or inappropriate content will automatically result in the
        review being rejected and not published. Any uploaded documents will be
        securely stored for verification purposes only, not posted publicly, and
        will be transferred to an external hard drive for protection. By
        uploading documents, you grant Ed-Cred permission to view your name or
        your child
        {"’"}s name solely for verification purposes. All other student names
        must be redacted to maintain confidentiality.
      </div>
      <FormFeilds
        fieldProps={{
          name: `agreeTerms`,
          className: "y-8 space-y-2",
        }}
      >
        {(field) => (
          <div className="flex gap-2 items-center">
            <input
              type={"checkbox"}
              {...field}
              onChange={field.onChange}
              className="peer accent-primary h-4 w-4 border border-gray-300 rounded-md"
            />
            <span>
              I agree to the{" "}
              <Link
                href={"/terms-of-use"}
                className="text-primary font-semibold"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href={"/web-use-policy"}
                className="text-primary font-semibold"
              >
                Privacy Policy.
              </Link>
            </span>
          </div>
        )}
      </FormFeilds>
      {/* Submit Button */}
      <Button variant="primary" type={"submit"} loading={isPending}>
        Submit Feedback
      </Button>
    </FormTemplate>
  );
};

export default FeedbackForm;
