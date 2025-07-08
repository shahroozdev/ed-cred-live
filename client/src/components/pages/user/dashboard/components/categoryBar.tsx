import { getStaticPropsData } from "@/lib/StaticPropsFetch";
import { FilterIcon } from "lucide-react";
import { CategoryCard } from "./categorCard";

const CategoryBar = async({
  setFilterCategory,
}: {
  setFilterCategory: (categoryId: string) => void;
}) => {
  const { categories:data } = await getStaticPropsData();
  const categories = data?.categories;
  return (
    <div className="flex flex-col gap-0 w-full cursor-pointer">
      <div className="font-semibold text-lg text-muted-foreground flex gap-2 items-center justify-start">
        <FilterIcon />
        Filter by category
      </div>
      <div className="flex gap-4 py-4 px-1  overflow-x-auto scrollbar-thi">
        {categories?.map((category: any) => (
          <CategoryCard
            category={category}
            key={category.id}
            setFilterCategory={setFilterCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
