import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { RecentFeedback } from "./RecentFeedbacks";
import { RecentPosts } from "./RecentPosts";
import { usePostStore } from "@/store/usePostStore";
import { Stats } from "@/components/Common/Stats";
import { useCategoryStore } from "@/store/categoryStore";
import { useEffect } from "react";
import { useFeedbacksStore } from "@/store/feedbackStore";
import { useQuery } from "@/hooks/generalHooks";

export const OverviewTab = () => {
    const { posts } = usePostStore();
  const { data, isLoading, error } = useQuery({
    url: "category",
    key: "categories",
  });
    const { feedbacks } = useFeedbacksStore();

    const stats = [
        {
            title: "Total Feedbacks",
            value: feedbacks?.length?.toString(),
        },
        {
            title: "Active Feedbacks",
            value: feedbacks?.filter(f => f?.status === "active")?.length?.toString(),
        },
        {
            title: "Total Posts",
            value: posts?.length?.toString(),
        },
        {
            title: "Total Categries",
            value: data?.categories?.length?.toString(),
        },

    ]
    return(
        <div>
            <Stats stats={stats}/>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <RecentFeedback />
                <Card className="col-span-3 h-max">
                    <CardHeader>
                        <CardTitle>Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentPosts />
                    </CardContent>
                </Card>
            </div>
    </div>
    )
}
