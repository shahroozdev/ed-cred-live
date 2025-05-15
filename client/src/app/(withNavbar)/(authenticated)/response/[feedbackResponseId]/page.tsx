"use client";
import React, { useState, useEffect, use } from "react";
import { Loader } from "@/components/ui/loader";
import { getRequest } from "@/api/config";
import Navbar from "@/components/Landing/Navbar";
import Image from "next/image";
import { AppleIcon } from "lucide-react";
import { v4 } from "uuid";
import { FeedbackResponse } from "@/api/feedback-response";
import { ReviewCard } from "@/components/Common/ReviewCard";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";

export default function FeedbackResponseViewPage({ params }: { params: Promise<{ feedbackResponseId: string }> }) {

    const { feedbackResponseId } = use(params);
    const [feedback, setFeedback] = useState<any|null>(null);
    const [related, setRelated] = useState<FeedbackResponse[]>([]);

    useEffect(() => {

        const fetchFeedback = async() => {
            const responseRaw = await getRequest(`/feedback-responses/${feedbackResponseId}`);
            if (!responseRaw) return;
            const responses = await responseRaw.json();

            setRelated(responses.related);
            let averageRating = 0;
            let totalRating = 0;
            let totalResponses = 0;

            responses.responses.forEach((response: FeedbackResponse) => {
                response.answers.forEach(answer => {
                    if (typeof answer.answer === 'number') {
                        totalRating += answer.answer;
                        totalResponses += 1;
                    }
                });
            });

            averageRating = totalRating/totalResponses;
            setFeedback({responses: [...responses.responses], totalReviews: responses.length, rating: averageRating});
        }

        fetchFeedback();
    }, [feedbackResponseId]);

    return(
        <div className="w-full h-full min-h-screen flex justify-center text-black pt-20">
            <Navbar />
            {
                feedback ? 
                    <div className="w-4xl">
                        <FeedbackView 
                            details={feedback.responses[0].details} 
                            feedbackForm={feedback.responses[0].feedbackForm} 
                            averageRating={feedback.rating} 
                            responses={feedback.responses}
                        /> 
                        <div className="flex flex-col gap-4 mt-10">
                            <div className="text-xl font-semibold">Related</div>
                            <div className="flex overlfow-x-scroll gap-4">
                                { related.map((r) => <ReviewCard key={r.id} response={r} hideRating />) }
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="text-2xl font-semibold mt-8">Feedbacks</div>

                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="flex flex-wrap gap-2">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    {
                                        Array.from(new Set(feedback.responses.map(r => r.author?.category?.name)))
                                        .map((category) => category && (
                                            <TabsTrigger key={category} value={category}>
                                                {category}
                                            </TabsTrigger>
                                        ))
                                    }
                                </TabsList>

                                <TabsContent value="all">
                                    {
                                        feedback.responses.map((response: FeedbackResponse) => (
                                            <IndividualReview key={response.id} response={response} />
                                        ))
                                    }
                                </TabsContent>

                                {
                                    Array.from(new Set(feedback.responses.map(r => r.author?.category?.name)))
                                    .map((category) => category && (
                                        <TabsContent key={category} value={category}>
                                            {
                                                feedback.responses
                                                .filter((r) => r.author?.category?.name === category)
                                                .map((response) => (
                                                    <IndividualReview key={response.id} response={response} />
                                                ))
                                            }
                                        </TabsContent>
                                    ))
                                }
                            </Tabs>
                        </div>
                    </div>: <Loader />
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
    averageRating: number;
    responses: FeedbackResponse[];
};

function FeedbackView({
    details,
    feedbackForm,
    averageRating,
}: FeedbackViewProps) {
    return (
        <div className="w-4xl max-w-4xl flex flex-col mt-20">
            <div className="text-2xl font-semibold mb-6">{feedbackForm.title}</div>
            <div className="flex gap-4 items-start">
                <Image src={`/uploads/categoryIcons/${feedbackForm.category.name.toLowerCase()}.png`} width={100} height={200} alt={""} className="h-auto w-12 object-contain" />
                <div className="">
                    {
                        details.pricipalName ? 
                            <>
                                <div className="text-4xl font-semibold">{details.pricipalName}</div>
                                {details.reportingPeriod &&
                                    <div className="text-base font-semibold">{new Intl.DateTimeFormat("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }).format(new Date(details.reportingPeriod.from ?? new Date()))} to {
                                            new Intl.DateTimeFormat("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }).format(new Date(details.reportingPeriod.to ?? new Date()))
                                        }
                                    </div>
                                }
                                <div className="text-lg">{details.schoolName} {details.schoolCountry}</div>
                            </>
                            :
                            <>
                                <div className="text-4xl font-semibold">{details.schoolName}</div>
                                <div className="text-lg">{details.schoolCountry}</div>
                            </>
                    }
                </div>
                <div className="text-4xl ml-auto">{averageRating.toFixed(0)}/10</div>
            </div>
        </div>
    );
}

const IndividualReview = ({ response }: { response : FeedbackResponse }) => {
    return (
        <div className="flex flex-col gap-4 py-6 bg-white">
            {
                response.answers.slice(0, response.answers.length - 1).map(answer => (<div key={answer.questionId} className="flex bg-muted p-4 rounded-lg">
                    <div className="text-lg">{response.feedbackForm.questions.filter((question: any) => question.id == answer.questionId)[0]?.text}</div>
                    <RatingBar rating={typeof answer.answer === 'number' ? answer.answer : 0} />
                </div>))
            }
            <div className="bg-muted p-4 rounded-lg text-lg flex flex-col">
                <div className="font-semibold">Comments</div>
                <div>{response.comments}</div>
            </div>
        </div>
    )
}

const RatingBar = ({ rating } : { rating: number }) => {
    return (
        <div className="flex gap-1 items-center justify-start ml-auto">
            {
                Array.from({length: 10}).map((_, i) => <AppleIcon key={v4()} size={20} fill={i + 1 < rating ? "red" : "gray"} stroke={i + 1 < rating ? "red" : "gray"} />)
            }
        </div>
    )
}
