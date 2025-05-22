"use client";
import { getFeedbackByCategory } from "@/api/feedback";
import { TitleWrapper } from "@/components/atoms";
import FeedbackForm from "@/components/Review/FeedbackForm";
import { useQuery } from "@/hooks/generalHooks";
import { Feedback } from "@/types";
import { LoaderIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function ReivewPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = use(params);
  const { data, isLoading } = useQuery({
    url: `/feedback-form/${category}/${subcategory}`,
    key: "",
  });
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
  console.log(data);
  return (
    <TitleWrapper title="Review Form">
      <div className="bg-background text-foreground h-auto">
        <div className="flex w-full items-center justify-center">
          {isLoading ? (
            <LoaderIcon className="animate-spin" />
          ) : data?.length < 1 ? (
            <div className="text-center text-4xl font-semibold">
              <div className="text-8xl">404</div>
              <p className="text-lg">
                The review you are looking for is not found
              </p>
            </div>
          ) : (
            <div className="w-full  flex flex-col items-start mt-2 border-[1px]">
              {data?.map((feedback: Record<string, any>) => (
                <div key={feedback.id} className="w-full">
                  <div className="flex flex-col items-center justify-center bg-[#F5F8F3] py-16">
                    <div className="text-4xl font-semibold">
                      {feedback.title}
                    </div>
                  </div>

                  <FeedbackForm feedback={feedback} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TitleWrapper>
  );
}
