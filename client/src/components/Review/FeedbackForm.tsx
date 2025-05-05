"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AppleIcon, OctagonAlertIcon } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Question } from "@/store/questionStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Feedback } from "../MainDashboard/RecentFeedbacks";
import { Input } from "../ui/input";
import { createFeedbackResponse, CreateFeedbackResponseDto } from "@/api/feedback-response";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useProfile";

const detailType = {
        schoolName:      "text",
        schoolWebsite:   "url",
        schoolCountry:   "dropdown",
        reportingPeriod: "date-range",
        pricipalName:    "text",
        pricipalDivison: "text",
        directorName:    "text",
        salary:          "number",
}


export const FeedbackForm = ({ feedback, color = "red" }: { feedback: Feedback, color?: string }) => {
    const [responses, setResponses] = useState<{ [key: string]: any }>({});
    const router = useRouter();
    const [details, setDetails] = useState({});
    const { user } = useUserProfile();

    const handleResponseChange = (id: string, value: any) => {
        setResponses((prev) => ({ ...prev, [id]: value }));
    };

const handleSubmit = async () => {
    try {
            const feedbackResponse: CreateFeedbackResponseDto = {
                feedbackFormId: feedback.id, 
                details: details,
                answers: Object.entries(responses)
                .map(([questionId, answer]) => ({
                    questionId,
                    answer,
                })),
                comments: responses["comments"] || "",
                submittedAt: new Date().toISOString(),
                authorId: user.id,
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

    const questions = feedback.questions;

    // TODO: Bring the salary option on the end
    return (
        <div className="w-4xl mx-auto mb-20 flex max-w-4xl flex-col gap-4 py-10">
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
                                            onChange={(val) => setDetails((prev) => ({ ...prev, [detail]: val }))}
                                        />
                                    ) : detailType[detail] === "date-range" ? (
                                            <DateRangePicker
                                                //@ts-ignore
                                                date={details[detail]}
                                                setDate={(value) =>
                                                    setDetails((prev) => ({ ...prev, [detail]: value }))
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
                                                        setDetails((prev) => ({ ...prev, [detail]: e.target.value }))
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
            {questions.map((question, index) => (
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

// Dynamically renders the correct input type based on the question type
const QuestionInput = ({ question, color, onChange }: { question: Question, color: string, onChange: (value: any) => void }) => {
    switch (question.type) {
        case "rating":
            return <RatingInput color={color} onChange={onChange} />;
        case "multiple_choice":
            return (
                <RadioGroup onValueChange={(value) => onChange(value)} className="ml-auto">
                    {question.options?.map((option, i) => (
                        <Label key={i} className="flex items-center gap-2">
                            <RadioGroupItem value={option.value} />
                            {option.value}
                        </Label>
                    ))}
                </RadioGroup>
            );
        case "true_false":
            return (
                <RadioGroup onValueChange={(value) => onChange(value === "true")}>
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="true" /> True
                    </Label>
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="false" /> False
                    </Label>
                </RadioGroup>
            );
        case "open_ended":
            return <Textarea onChange={(e) => onChange(e.target.value)} />;
        default:
            return null;
    }
};

// Rating Input Component
const RatingInput = ({ color, onChange }: { color: string, onChange: (value: number) => void }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRating = (value: number) => {
        setRating(value);
        onChange(value);
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 10 }).map((_, i) => {
                const isActive = rating >= 10 - i;
                const isHovered = hoverRating >= 10 - i;

                return (
                    <AppleIcon
                        key={`apple-${i}`}
                        className={cn(
                            colorVariants[color] || "text-gray-400 fill-gray-400 hover:fill-gray-300",
                            isActive ? "fill-current" : isHovered ? "fill-opacity-70" : "fill-opacity-30"
                        )}
                        onMouseOver={() => setHoverRating(10 - i)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRating(10 - i)}
                    />
                );
            })}
        </div>
    );
};

// Color Variants for Rating Icons
const colorVariants: Record<string, string> = {
    red: "text-red-400 fill-red-400 hover:fill-red-300",
    blue: "text-blue-400 fill-blue-400 hover:fill-blue-300",
    green: "text-green-400 fill-green-400 hover:fill-green-300",
    yellow: "text-yellow-400 fill-yellow-400 hover:fill-yellow-300",
};

export function DateRangePicker({
    date,
    setDate,
}: {
        date: DateRange | undefined
        setDate: (range: DateRange | undefined) => void
    }) {
    const formatted =
        date?.from && date?.to
            ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
            : "Pick a date range"

    return (
        <div className="w-full">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatted}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}


export const CountryDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    const countries = [
        "United States",
        "Canada",
        "United Kingdom",
        "Germany",
        "France",
        "India",
        "China",
        "Japan",
        "Australia",
        "Brazil",
        "South Korea",
        "Russia",
        "Mexico",
        "Italy",
        "Spain",
        "South Africa",
        "Saudi Arabia",
    ]

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
                {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                        {country}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default FeedbackForm;
