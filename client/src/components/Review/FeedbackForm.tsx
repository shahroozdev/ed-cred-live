"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OctagonAlertIcon } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createFeedbackResponse } from "@/api/feedback-response";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { CountryDropdown, DateRangePicker, QuestionInput } from "../atoms";
import { detailType } from "@/data/constant";

const FeedbackForm = ({ feedback, color = "red" }: { feedback: any, color?: string }) => {
    const [responses, setResponses] = useState<{ [key: string]: any }>({});
    const router = useRouter();
    const [details, setDetails] = useState<any>({});

    const handleResponseChange = (id: string, value: any) => {
        setResponses((prev) => ({ ...prev, [id]: value }));
    };

const handleSubmit = async () => {
    try {
            const feedbackResponse: any = {
                feedbackFormId: feedback.id, 
                details: details,
                answers: Object.entries(responses)
                .map(([questionId, answer]) => ({
                    questionId,
                    answer,
                })),
                comments: responses["comments"] || "",
                submittedAt: new Date().toISOString(),
            };

            await createFeedbackResponse(feedbackResponse);

            toast("Feedback submitted successfully!");
            router.push("/user/dashboard");
            setResponses({});
        } catch (error) {
            toast("Error submitting feedback.");
            console.error(error);
        }
    };

    const questions = feedback?.questions;

    // TODO: Bring the salary option on the end
    return (
        <div className="w-full flex  flex-col gap-4 py-10 px-4">
            <div className="outline-muted rounded-md p-6 outline-2 flex flex-col w-full mt-10 gap-4">
                {
                    Object.keys(feedback.details).map((detail, i) => {
                        // @ts-ignore
                        if (feedback.details[detail]) {
                            return (
                                <div key={`detial-${i}`} className="flex gap-2">
                                    <Label className="capitalize flex-grow w-sm">{detail.split(/(?=[A-Z])/).join(' ')}</Label>
                                    {/* @ts-ignore */}
                                    {detailType[detail] === "dropdown" ? (
                                        <CountryDropdown
                                            value={details[detail]}
                                            onChange={(val) => setDetails((prev:any) => ({ ...prev, [detail]: val }))}
                                        />
                                    ) : detailType[detail] === "date-range" ? (
                                            <DateRangePicker
                                                //@ts-ignore
                                                date={details[detail]}
                                                setDate={(value) =>
                                                    setDetails((prev:any) => ({ ...prev, [detail]: value }))
                                                }
                                            />
                                        ) : (
                                                <Input
                                                    //@ts-ignore
                                                    type={detailType[detail]}
                                                    placeholder={detail.split(/(?=[A-Z])/).join(' ').toLowerCase()}
                                                    //@ts-ignore
                                                    value={details[detail]}
                                                    onChange={(e) =>
                                                        setDetails((prev:any) => ({ ...prev, [detail]: e.target.value }))
                                                    }
                                                />
                                            )}
                                </div>
                            )
                        }
                    })
                }
                {/*     <Input */}
                {/*         type="text" */}
                {/*         placeholder="Your name" */}
                {/*         value={details.name} */}
                {/*         onChange={(e) => setDetails((prev) => ({ ...prev, name: e.target.value }))} */}
                {/*     /> */}
                {/*     {feedback.details.web && ( */}
                {/*         <Input */}
                {/*             type="text" */}
                {/*             placeholder="Website" */}
                {/*             value={details.web} */}
                {/*             onChange={(e) => setDetails((prev) => ({ ...prev, web: e.target.value }))} */}
                {/*         /> */}
                {/*     )} */}
                {/**/}
                {/*     {feedback.details.pricipalName && ( */}
                {/*         <Input */}
                {/*             type="text" */}
                {/*             placeholder="Pricipal Name" */}
                {/*             value={details.web} */}
                {/*             onChange={(e) => setDetails((prev) => ({ ...prev, principalName: e.target.value }))} */}
                {/*         /> */}
                {/*     )} */}
                {/**/}
                {/*     {feedback.details.dates && ( */}
                {/*         <Input */}
                {/*             type="text" */}
                {/*             placeholder="Dates you worked there" */}
                {/*             value={details.dates} */}
                {/*             onChange={(e) => setDetails((prev) => ({ ...prev, dates: e.target.value }))} */}
                {/*         /> */}
                {/*     )} */}
                {/*     {feedback.details.salary && ( */}
                {/*         <Input */}
                {/*             type="text" */}
                {/*             placeholder="Your estimated salary" */}
                {/*             value={details.salary} */}
                {/*             onChange={(e) => setDetails((prev) => ({ ...prev, salary: e.target.value }))} */}
                {/*         /> */}
                {/*     )} */}
                {/*     {feedback.details.country && ( */}
                {/*         <Input */}
                {/*             type="text" */}
                {/*             placeholder="Your country" */}
                {/*             value={details.country} */}
                {/*             onChange={(e) => setDetails((prev) => ({ ...prev, country: e.target.value }))} */}
                {/*         /> */}
                {/*     )} */}
            </div>
            {questions.map((question:any, index:number) => (
                <div className={`outline-2 outline-muted flex ${question.type != "rating" ? "flex-col" : ""} w-full justify-between rounded-md p-4`} key={`feedback-question-${index}`}>
                    <p className="mb-2 font-medium">{question.text}</p>
                    <QuestionInput
                        question={question}
                        color={color}
                        onChange={(value) => handleResponseChange(question.id, value)}
                    />
                </div>
            ))}

            {/* Additional Comments */}
            <div className="my-8 space-y-2">
                <Label className="flex flex-col items-start gap-1">
                    <div>Please add your comments below</div>
                    <div className="text-muted-foreground text-sm">Feedback with comments takes top priority!</div>
                </Label>
                <Textarea onChange={(e) => handleResponseChange("comments", e.target.value)} />
            </div>

            {/* AI Review Warning */}
            <div className={cn("bg-destructive/10 dark:bg-destructive/20 border-destructive-foreground",
                "text-destructive-foreground flex gap-2 rounded-md p-4 text-sm")}>
                <OctagonAlertIcon size={18} />
                <div>Please avoid submitting AI-generated reviews. The human experience is what Ed Cred is all about!</div>
            </div>

            {/* Submission Terms */}
            <div className="text-sm text-muted-foreground">
                Conditions of Submission: Your School Review is anonymous, even to us at ISR. We cannot delete, change, or edit Reviews. Submission is irreversible. By clicking the Submit button, you confirm that you AGREE to abide by our Terms of Use.
            </div>

            {/* Submit Button */}
            <Button size={"lg"} onClick={handleSubmit}>
                Submit Feedback
            </Button>
        </div>
    );
};

export default FeedbackForm;
