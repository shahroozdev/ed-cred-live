import { CategoryTable } from "@/components/Category/CategoryTable";
import { AddCategory } from "@/components/Category/AddCategory";
import TitleWrapper from "@/components/atoms/titleWrapper";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

const CategoryPage = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const queryParams = new URLSearchParams(params);
  console.log(queryParams)
  const data = await getServerSideDataWithFeatures({
    url: `/category?${queryParams.toString()}`,
    key: "categories",
  });
  return (
    <TitleWrapper title="Categories">
      <div className="bg-background text-foreground relative flex flex-col overflow-x-hidden font-inter">
        <div className="flex flex-col gap-4 p-5 items-center">
          <div className="flex flex-col gap-8 w-full">
            {/* <Stats stats={stats} /> */}
            <AddCategory />
            <CategoryTable data={data} />
          </div>
        </div>
      </div>
    </TitleWrapper>
  );
};

export default CategoryPage;
