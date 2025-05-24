import { CategoryCard, TitleWrapper } from "@/components/atoms";
import Link from "next/link";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

const ReviewPage = async () => {
  const data = await getServerSideDataWithFeatures({
    url: "/feedback-form/bySubcategory",
    key: "feedbackFormForReview",
  });
console.log(data)
  return (
    <TitleWrapper
      title="Review"
      desc="Select the type of review you will submit"
      notBackBtn
    >
      <div
        className={
          "bg-background text-foreground font-inter flex w-full flex-col gap-20 items-center overflow-hidden"
        }
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <span
            className={
              "bg-[#A1AF001A] font-normal text-[#439E5E] dark:bg-green-800/50 w-max rounded-2xl px-4 py-2 text-xs uppercase"
            }
          >
            ALL REVIEWS POSTED ANONYMOUSLY, GUARANTEED!
          </span>
        </div>

        <div className="flex max-w-5xl flex-row flex-wrap items-center justify-center gap-8">
          {data?.feedbacks?.map(
            (feedback: Record<any, any>) =>
              feedback?.category && (
                <Link
                  href={`/review/${feedback?.category?.id}/${feedback?.subcategory?.id}`}
                  key={feedback?.category?.id}
                  className="min-w-[270px] h-full cursor-pointer hover:scale-110 !p-5 transition-all duration-300 ease-in-out"
                >
                  <CategoryCard title={feedback?.category?.name} />
                </Link>
              )
          )}
        </div>
      </div>
    </TitleWrapper>
  );
};

export default ReviewPage;
