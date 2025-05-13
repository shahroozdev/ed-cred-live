"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/api/categories";
import { fetchFeedbacks } from "@/api/feedback";
import { Feedback } from "@/components/MainDashboard/RecentFeedbacks";
import { Category } from "@/types/user";
import Navbar from "@/components/Landing/Navbar";

const CategoryCard = ({ category }: { category: Category }) => {
    const router = useRouter();
    
    return (
        <div className="flex flex-col items-start">
            <div 
                className={cn("outline-foreground/20 bg-foreground/2 rounded-2xl px-10 py-12 outline",
                    "w-xs flex flex-col items-center justify-center gap-4",
                    "hover:bg-foreground/5 shadow-sm transition-colors")}
                onClick={() => router.push(`review/${category.id}/0`)}
            >
                <Image src={`/uploads/categoryIcons/${category.name.toLowerCase()}.png`} width={100} height={200} alt={category.name} className="h-auto w-24" />
                <div className="text-center text-lg font-semibold capitalize">{category.name}</div>
            </div>
        </div>
    );
};

const ReviewPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [feedbacksBySubcategory, setFeedbacksBySubcategory] = useState<{ [key: string]: Feedback[] }>({});

    useEffect(() => {
        const setup = async () => {
            const categoryData = await getAllCategories();
            console.log(categoryData);
            setCategories(categoryData);
            console.log(categoryData);

            const feedbackData = await fetchFeedbacks();

            // Group feedbacks by subcategory ID
            const groupedFeedbacks: { [key: string]: Feedback[] } = {};
            feedbackData.forEach((feedback: Feedback) => {
                const subcategoryId = feedback.subcategory.id ?? 0;
                if (!groupedFeedbacks[subcategoryId]) {
                    groupedFeedbacks[subcategoryId] = [];
                }
                groupedFeedbacks[subcategoryId].push(feedback);
            });

            setFeedbacksBySubcategory(groupedFeedbacks);
        };

        setup();
    }, []);

    return (
        <div className={cn("bg-background text-foreground font-inter",
            "flex h-screen w-screen flex-col gap-20", 
            "items-center justify-center overflow-hidden")}
        >
            <Navbar />
            <div className="flex max-w-3xl flex-col items-center justify-center gap-4 text-center">
                <span 
                    className={cn("bg-[#A1AF001A] font-normal text-[#439E5E] dark:bg-green-800/50",
                        "w-max rounded-2xl px-4 py-2 text-xs uppercase")}
                >
                    ALL REVIEWS POSTED ANONYMOUSLY, GUARANTEED!
                </span>
                <span className="text-4xl font-semibold capitalize">Select the type of review you will submit</span>
            </div>

            <div className="flex max-w-5xl flex-row flex-wrap items-center justify-center gap-8">
                {categories.map(category => (
                    //@ts-ignore
                    category.feedbackForms.length > 0 &&
                    <CategoryCard 
                        key={category.id} 
                        category={category} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;
