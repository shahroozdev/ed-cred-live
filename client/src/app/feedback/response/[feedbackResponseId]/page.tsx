"use client";
import React, { useState, useEffect, use } from "react";
import { Loader } from "@/components/ui/loader";
import { getRequest } from "@/api/config";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function FeedbackResponseViewPage({ params }: { params: Promise<{ feedbackResponseId: string }> }) {

    const { feedbackResponseId } = use(params);
    const [feedback, setFeedback] = useState<any|null>(null);

    useEffect(() => {

        const fetchFeedback = async() => {
            const responseRaw = await getRequest(`/feedback-responses/response/${feedbackResponseId}`);
            if (!responseRaw) return;
            const response = await responseRaw.json();
            console.log(response);
            setFeedback(response[0]);
        }

        fetchFeedback();
    }, [feedbackResponseId]);

    return(
        <div className="w-full h-full min-h-screen flex items-center justify-center text-black">
            {
                feedback ? <FeedbackView {...feedback} /> : <Loader />
            }
        </div>
    )
}


type FeedbackViewProps = {
    feedbackForm: any;
    details: {
        salary:          any;
        schoolName:      any;
        schoolWebsite:   any;
        schoolCountry:   any;
        reportingPeriod: any;
        pricipalName:    any;
        pricipalDivison: any;
        directorName:    any;
    };
    answers: {
        questionId: string;
        answer: string | string[] | boolean | number;
    }[];
    comments?: string;
    submittedAt: string;
};

const formatAnswer = (answer: string | string[] | boolean | number) => {
    if (Array.isArray(answer)) return answer.join(', ');
    if (typeof answer === 'boolean') return answer ? 'Yes' : 'No';
    return String(answer);
};

function FeedbackView({
    details,
    answers,
    comments,
    submittedAt,
    feedbackForm,
}: FeedbackViewProps) {
    return (
        <div className="p-6 space-y-6 w-4xl max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold">{feedbackForm.title}</h2>

            <Separator />

            <div className="space-y-3">
                <h3 className="text-lg font-semibold">Details</h3>
                {Object.entries(details).map(([key, value]) =>
                    value ? (
                        <div key={key} className="flex justify-between text-sm">
                            <span className="capitalize text-muted-foreground">{key}</span>
                            <span className="font-medium">{key !== "reportingPeriod" ? value : 
                                <div>{new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", }).format(new Date(value.from))} to {new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", }).format(new Date(value.to))}</div>}</span> </div>
                    ) : null
                )}
            </div>

            <Separator />

            <div className="space-y-3">
                <h3 className="text-lg font-semibold">Answers</h3>
                {answers.map(({ questionId, answer }, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{feedbackForm.questions.filter((q: any) => q.id == questionId)[0]?.text}</span>
                        <span className="font-medium">{formatAnswer(answer)}</span>
                    </div>
                ))}
            </div>

            {comments && (
                <>
                    <Separator />
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Comments</h3>
                        <p className="text-sm leading-relaxed">{comments}</p>
                    </div>
                </>
            )}

            <Separator />

            <div className="text-xs text-muted-foreground text-right">
                Submitted on <Badge variant="outline">{new Date(submittedAt).toLocaleString()}</Badge>
            </div>
        </div>
    );
}
