'use client'
import { useQuery } from '@/hooks/generalHooks';
import { cn } from '@/lib/utils';
import { imagesUrls } from '@/types';
import { Category } from '@/types/user';
import { FilterIcon } from 'lucide-react';
import Image from 'next/image';

const CategoryBar = ({
  setFilterCategory,
}: {
  setFilterCategory: (categoryId: string) => void;
}) => {
  const { data, isLoading, error } = useQuery({
    url: "/category",
    key: "categories",
  });
  const categories = data?.categories;
  return (
    <div className="flex flex-col gap-0 w-full cursor-pointer">
      <div className="font-semibold text-lg text-muted-foreground flex gap-2 items-center justify-start">
        <FilterIcon />
        Filter by category
      </div>
      <div className="flex gap-4 py-4 px-1  overflow-x-auto scrollbar-thi">
        {categories?.map((category:any) => (
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

const CategoryCard = ({
  category,
  setFilterCategory,
}: {
  category: Category;
  setFilterCategory: (categoryId: string) => void;
}) => {
  return (
    <div className="flex items-start">
      <div
        className={cn(
          "outline-foreground/20 bg-foreground/2 rounded-2xl px-3 py-2 outline",
          "w-max flex _flex-col items-center justify-center gap-4",
          "hover:bg-foreground/5 shadow-sm transition-colors"
        )}
        onClick={() =>
          setFilterCategory(category.id ? category.id?.toString() : "")
        }
      >
        <Image
          src={`/uploads/categoryIcons/${imagesUrls[category?.name]}.png`}
          width={200}
          height={200}
          alt={category.name}
          className="w-12 h-auto object-cover"
        />
        <div className="text-center text-lg font-semibold capitalize">
          {category.name}
        </div>
      </div>
    </div>
  );
};
export default CategoryBar;
