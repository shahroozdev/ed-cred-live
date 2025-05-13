"use client"
import { getFeedbackByCategory } from "@/api/feedback";
import Navbar from "@/components/Landing/Navbar";
import { Feedback } from "@/components/MainDashboard/RecentFeedbacks";
import FeedbackForm from "@/components/Review/FeedbackForm";
import { LoaderIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function ReivewPage({ params }: { params: Promise<{ category: string; subcategory: string; }> }) {
    const { category, subcategory } = use(params);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function loadFeedbacks() {
            const data = await getFeedbackByCategory(category, subcategory);
            if (data.error || data.length == 0) {
                setNotFound(true);
                return;
            }
            setFeedbacks(data);
        }
        loadFeedbacks();
    }, []);

    return(
        <div className="bg-background text-foreground h-auto">
            <div className="flex h-screen w-full items-center justify-center">
                {
                    notFound ? 
                        <div className="text-center text-4xl font-semibold">
                            <div className="text-8xl">404</div>
                            <p className="text-lg">The review you are looking for is not found</p>
                        </div> 
                        :
                        feedbacks.length <= 0 ? 
                            <LoaderIcon className="animate-spin" />
                            :
                            <div className="w-full flex h-full flex-col items-start mt-40">
                                <Navbar />
                                {
                                    feedbacks.map((feedback) => (
                                        <div key={feedback.id} className="w-full">
                                            <div className="flex flex-col items-center justify-center bg-[#F5F8F3] py-16">
                                                <div className="text-4xl font-semibold">{feedback.title}</div>
                                            </div>

                                            <FeedbackForm feedback={feedback} />
                                        </div>
                                    )
                                    )}
                            </div>
                }
            </div>
        </div>
    )
}
