import { AddSubCategory } from "@/components/Category/AddSubCategory";
import { SubCategoryTable } from "@/components/Category/SubcategoryTable";

import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";

const CategoryPage = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const queryParams = new URLSearchParams(params);
  const data = await getServerSideDataWithFeatures({
    url: `/subcategory/with-filters?${queryParams.toString()}`,
    key: "categories",
  });

  console.log(data, 'data')
  return (
    <TitleWrapper title="Sub Categories">
      <div className="bg-background text-foreground relative flex flex-col overflow-x-hidden font-inter">
            <div className="flex flex-col gap-4 p-5 items-center">
                <div className="flex flex-col gap-8 w-full">
            {/* <Stats stats={stats} /> */}
            <AddSubCategory />
            <SubCategoryTable data={data} />
          </div>
        </div>
      </div>
    </TitleWrapper>
  );
};

export default CategoryPage;
