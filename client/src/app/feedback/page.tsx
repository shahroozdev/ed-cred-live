"use client";
import { useEffect, useState } from "react";
import { fetchFeedbacks } from "@/api/feedback";
import { RecentFeedback } from "@/components/MainDashboard/RecentFeedbacks";
import { Stats } from "@/components/Common/Stats";
import { Title } from "@/components/Common/Title";
import { Navbar } from "@/components/Common/Navbar";

export default function FeedbacksPage() {
    const [feedbacks, setFeedbacks] = useState<any[]>([]);

    useEffect(() => {
        async function loadFeedbacks() {
            const data = await fetchFeedbacks();
            console.log(data)
            setFeedbacks(data);
        }
        loadFeedbacks();
    }, []);

    const stats = [
        {
            title: "Total feedbacks",
            value: feedbacks.length.toString(),
        }, 
        {
            title: "Active Feedbacks",
            value: feedbacks.filter(s => s.status === "active").length.toString(),
        }
    ];

    return (
        <div className="w-3xl mx-auto my-10 flex max-w-4xl flex-col">
            <Title 
                title="Feedbacks"
                desc="Here are the recent feedback forms. You can go here to create a new feedback form."
            />
            <Stats stats={stats}/>
            <RecentFeedback />
        </div>
    );
}
