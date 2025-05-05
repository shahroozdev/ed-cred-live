"use client";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";

const Categories = () => {

    const { categories } = useCategories();

    return (
        <div className="flex h-auto w-full flex-col items-center justify-center gap-14 pb-10">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-max rounded-full bg-[#A1AF001A] p-2 px-4 font-sans text-xs  font-[400] tracking-widest text-[#439E5E] md:text-base">
                    CATEGORIES
                </div>
                <div className="text-3xl font-[400]">What are <span className="font-bold">you looking for?</span></div>
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-8 px-10 md:w-2/3 md:flex-nowrap md:px-0">
                {
                    categories && categories.map((category, index) => <Card title={category.name} key={`card-${index}`} />)
                }
            </div>
        </div>
    )
}

export const Card = ({ title }) => {
    return (
        <div className="flex items-center justify-center gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg md:flex-col min-w-20">
            <div><Image src={`/uploads/categoryIcons/${title.toLowerCase()}.png`} width={200} height={300} alt={title} className="w-[200px] h-auto md:w-[200px] object-cover" /></div>
            <div className="text-left md:text-center">
                <div className="text-xl font-[600]">{title}</div>
            </div>
        </div>
    )
}

export default Categories;
