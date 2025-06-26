import { CategoryCard, TitleWrapper } from "@/components/atoms";
import Link from "next/link";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

const ReviewPage = async () => {
  const { categories } = await getServerSideDataWithFeatures({
    url: "/category",
    key: "categories",
  });

  return (
    <TitleWrapper
      title="Review"
      desc="Select the type of review you will submit"
    >
      <div
        className={
          "bg-background text-foreground font-inter flex w-full flex-col gap-5 items-center overflow-hidden"
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

        <div className="flex w-full h-full flex-row flex-wrap items-center justify-center gap-8">
          {categories?.map(
            (category: Record<any, any>) =>
              category?.feedbackForms?.length > 0 && (
                <Link
                  href={`/review-admin/${category.id}/${category?.feedbackForms[0]?.subcategory?.id}`}
                  key={category?.id}
                  className="min-w-[270px] h-full cursor-pointer hover:scale-110 !p-5 transition-all duration-300 ease-in-out"
                >
                  <CategoryCard title={category.name} />
                </Link>
              )
          )}
        </div>
      </div>
    </TitleWrapper>
  );
};

export default ReviewPage;
