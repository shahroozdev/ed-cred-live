import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import FeedbackForm from "@/components/Review/FeedbackForm";

export default async function ReivewPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;
  const data = await getServerSideDataWithFeatures({
    url: `/feedback-form/bySubcategory?categoryId=${category}`,
    key: "feedbackFormForReview",
  });
  const feedbacks = data?.feedbacks;
  return (
    <TitleWrapper
      title="Review"
      desc="Select the type of review you will submit"
      notBackBtn
    >
      <div className="w-full">
        {feedbacks.length <= 0 ? (
          <div className="text-center text-4xl font-semibold">
            <div className="text-8xl">404</div>
            <p className="text-lg">
              The review you are looking for is not found
            </p>
          </div>
        ) : (
          // feedbacks.length <= 0 ?
          //     <LoaderIcon className="animate-spin" />
          //     :
          <div className="w-full flex h-full flex-col items-start">
            {feedbacks.map((feedback: Record<string, any>) => (
              <div key={feedback.id} className="w-full">
                <div className="flex flex-col items-center justify-center bg-[#F5F8F3] py-16">
                  <div className="text-4xl font-semibold">{feedback.title}</div>
                </div>

                <FeedbackForm feedback={feedback} />
              </div>
            ))}
          </div>
        )}
      </div>
    </TitleWrapper>
  );
}
