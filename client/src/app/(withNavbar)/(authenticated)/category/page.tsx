import TitleWrapper from "@/components/atoms/titleWrapper";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { AddCategory } from "@/components/pages/admin/Category/AddCategory";
import { CategoryTable } from "@/components/pages/admin/Category/CategoryTable";

const CategoryPage = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const queryParams = new URLSearchParams(params);
  const data = await getServerSideDataWithFeatures({
    url: `/category/with-filters?${queryParams.toString()}`,
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
