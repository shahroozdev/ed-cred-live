'use client'
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
import { useFeedbacksStore } from "@/store/feedbackStore";
import { useQuery } from "@/hooks/generalHooks";

export const OverviewTab = () => {
    const { posts } = usePostStore();
  const { data } = useQuery({
    url: "/category",
    key: "categories",
  });
//   const { data:feedbacks} = useQuery({
//     url: "/feedback",
//     key: "feedbacks",
//   });
    const { feedbacks } = useFeedbacksStore();

    const stats = [
        {
            title: "Total Feedbacks",
            value: feedbacks?.length?.toString(),
        },
        {
            title: "Active Feedbacks",
            value: feedbacks?.filter((f:any) => f?.status === "active")?.length?.toString(),
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
        <div className="w-full">
            <Stats stats={stats}/>
            <div className="grid gap-4 lg:grid-cols-3 grid-cols-1 w-full">
                <RecentFeedback />
                <Card className="col-span-1 h-max">
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
