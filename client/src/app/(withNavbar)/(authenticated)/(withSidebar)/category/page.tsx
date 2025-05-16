import { CategoryTable } from "@/components/Category/CategoryTable";
import { AddCategory } from "@/components/Category/AddCategory";
import TitleWrapper from "@/components/atoms/titleWrapper";

const CategoryPage = () => {
  
    return (
        <TitleWrapper title="Categories">
        <div className="bg-background text-foreground relative flex flex-col overflow-x-hidden font-inter">
            <div className="flex flex-col gap-4 p-5 items-center">
                <div className="flex flex-col gap-8 w-full">
                    {/* <Stats stats={stats} /> */}
                    <AddCategory />
                    <CategoryTable />
                </div>
            </div>
        </div>
        </TitleWrapper>
    );
};

export default CategoryPage;
