"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RecentFeedback } from "./RecentFeedbacks";
import { RecentPosts } from "./RecentPosts";
import { Stats } from "@/components/molecules/stats/Stats";
import TableSkeleton from "@/skeletons/tableSkeleton";
import AdminDashboardSkeleton from "@/skeletons/admin/dashboard/AdminDashboardSkeleton";

export const OverviewTab = ({
  feedbacks,
  categories,
  posts,
}: {
  feedbacks: Record<string, any>;
  categories: Record<string, any>;
  posts: Record<string, any>;
}) => {
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
      value: posts?.total,
    },
    {
      title: "Total Categories",
      value: categories?.categories?.length?.toString(),
    },
  ];

  return (
    <div className="w-full">
      <Stats stats={stats} />
      <div className="grid gap-4 lg:grid-cols-3 grid-cols-1 w-full">
        <RecentFeedback data={feedbacks} />
        <Card className="col-span-1 h-max">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentPosts posts={posts?.posts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
