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


export const OverviewTab = ({feedbacks, categories}:{feedbacks:Record<string, any>, categories:Record<string, any>}) => {
    const { posts } = usePostStore();
    const stats = [
        {
            title: "Total Feedbacks",
            value: feedbacks?.feedbacks?.length?.toString(),
        },
        {
            title: "Active Feedbacks",
            value: feedbacks?.activeCount,
        },
        {
            title: "Total Posts",
            value: posts?.length?.toString(),
        },
        {
            title: "Total Categries",
            value: categories?.categories?.length?.toString(),
        },

    ]
    return(
        <div className="w-full">
            <Stats stats={stats}/>
            <div className="grid gap-4 lg:grid-cols-3 grid-cols-1 w-full">
                <RecentFeedback data={feedbacks}/>
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
