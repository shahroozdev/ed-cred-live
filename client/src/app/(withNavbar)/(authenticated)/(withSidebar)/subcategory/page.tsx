"use client";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/categoryStore";
import { Stats } from "@/components/Common/Stats";
import { useRouter } from "next/navigation";
import { Title } from "@/components/Common/Title";
import { AddSubCategory } from "@/components/Category/AddSubCategory";
import { SubCategoryTable } from "@/components/Category/SubcategoryTable";
import TitleWrapper from "@/components/atoms/titleWrapper";

const CategoryPage = () => {
  const { categories, fetchCategories, addCategory } = useCategoryStore();
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"active" | "draft">("active");

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!name) return alert("Category name is required!");
    await addCategory({ name, status });
    setName("");
  };

  const stats = [
    {
      title: "Total Categories",
      value: categories.length.toString(),
    },
    {
      title: "Active Categories",
      value: categories.filter((c) => c.status === "active").length.toString(),
    },
    {
      title: "Draft Categories",
      value: categories.filter((c) => c.status !== "active").length.toString(),
    },
  ];

  return (
    <TitleWrapper title="Sub Categories">
      <div className="bg-background text-foreground relative flex flex-col overflow-x-hidden font-inter">
            <div className="flex flex-col gap-4 p-5 items-center">
                <div className="flex flex-col gap-8 w-full">
            {/* <Stats stats={stats} /> */}
            <AddSubCategory />
            <SubCategoryTable />
          </div>
        </div>
      </div>
    </TitleWrapper>
  );
};

export default CategoryPage;
