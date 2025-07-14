import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StatsSkeleton from "@/skeletons/statsSkeleton";
import TableSkeleton from "@/skeletons/tableSkeleton";
import React from "react";

const AdminDashboardSkeleton = () => {
  return (
    <div className="w-full">
      <StatsSkeleton />
      <div className="grid gap-4 lg:grid-cols-3 grid-cols-1 w-full">
        <div className="col-span-2">
          <TableSkeleton title="Recent Feedback" />
        </div>
        <Card className="col-span-1 h-max">
          <CardContent className="col-span-1 h-max">
            <CardHeader className="!px-0">
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <div>
              {Array.from({ length: 3 })?.map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="text-lg mt-4 font-semibold animate-pulse h-3 w-30 bg-gray-50" />
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-base animate-pulse h-3 w-10 bg-gray-50" />
                    <p className="text-muted-foreground text-base animate-pulse h-3 w-10 bg-gray-50" />
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
