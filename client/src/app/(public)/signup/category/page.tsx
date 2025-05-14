"use client";
import { setUserCategory } from "@/api/auth";
import { useCategoryStore } from "@/store/categoryStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Footer from "@/components/Landing/Footer";
import { Category } from "@/types/user";
import { imagesUrls } from "@/types";

const SignupCategorySelectPage = () => {

    const { categories, fetchCategories } = useCategoryStore();

    useEffect(() => {
        // Check if the user has already selected a category.
        // If they are already assigned to a category, they 
        // should not be able to change it.

        fetchCategories();
    }, []);

    return (
        <main className="w-full h-screen font-inter flex flex-col gap-10 items-center justify-between">
            <div className="flex flex-col gap-4 w-full h-auto items-center justify-center py-10 max-w-[1400px] m-auto">
                <div className="w-lg text-center mb-10">
                    <div className="font-semibold text-3xl">Select Category</div>
                    <div className="font-semibold text-base">Please select a category you are a part of</div>
                </div>
                <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 px-4">
                    {
                        categories.map((category) => <Card category={category} key={category.id} />)
                    }
                </div>
            </div>
        </main>
    )
}

const Card = ({ category }: {category: Category}) => {
    const router = useRouter();
    const selectCategory = async () => {

        if (!category.id) {
            console.error("Category ID is not defined");
            return;
        }

        const response = await setUserCategory(category.id);

        if (response.error) {
            toast.error(response.message);
            return;
        }

        if (response.requiresVerification) {
            router.push("/user/verify/");
        } else {
            router.push("/user/welcome");
        }
    };

    return (
        <div 
            className="flex items-center sm:justify-center justify-start gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg sm:flex-col hover:shadow-xl"
            onClick={() => selectCategory()}>
            <div><img src={`/uploads/categoryIcons/${imagesUrls[category?.name]}.png`} width={200} height={300} alt={category.name} className="w-[100px] h-[100px]" /></div>
            <div className="text-left sm:text-center">
                <div className="text-xl font-[600] text-black">{category?.name}</div>
                {/* <div className="font-[400]">{description}</div> */}
            </div>
        </div>
    )
}

const CategoryCard = ({ category } : { category: Category }) => {
    const router = useRouter();
    const selectCategory = async () => {

        if (!category.id) {
            console.error("Category ID is not defined");
            return;
        }

        const response = await setUserCategory(category.id);

        if (response.error) {
            toast.error(response.message);
            return;
        }

        console.log(response.requiresVerification);

        if (response.requiresVerification) {
            router.push("/user/verify/");
        } else {
            router.push("/user/welcome");
        }
    };

    return (
        <div
            className="p-4 border-2 border-muted rounded-md hover:border-primary transition-colors cursor-pointer"
            onClick={selectCategory}
        >
            {category.name}
        </div>
    )
}

export default SignupCategorySelectPage;
