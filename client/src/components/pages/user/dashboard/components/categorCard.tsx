'use client'
import { cn } from "@/lib/utils";
import { Category } from "@/types/user";
import Image from "next/image";

export const CategoryCard = ({
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
          src={`/uploads/categoryIcons/${category?.iconUrl}.png`}
          width={200}
          height={200}
          alt={category.name}
          className="w-12 h-auto object-cover"
          onError={(e: any) => {
            e.target.src = "/uploads/categoryIcons/principal";
          }}
        />
        <div className="text-center text-lg font-semibold capitalize">
          {category.name}
        </div>
      </div>
    </div>
  );
};