"use client";
import { useQuery } from "@/hooks/generalHooks";
import Image from "next/image";
import { Slider } from "../molecules";
import { imagesUrls } from "@/types";

const Categories = () => {
  const { data, isLoading, error } = useQuery({
    url: "/category",
    key: "categories",
  });
  const categories = data?.categories;
  const breakpoints = {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  };

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center gap-14 pb-10 px-4 max-w-[1200px] m-auto">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-max rounded-full bg-[#A1AF001A] p-2 px-4 font-sans text-xs  font-[400] tracking-widest text-[#439E5E] md:text-base">
          CATEGORIES
        </div>
        <div className="text-3xl font-[400]">
          What are <span className="font-bold">you looking for?</span>
        </div>
      </div>
      <Slider
        slides={categories}
        className="relative flex justify-center w-full !p-2"
        breakpoints={breakpoints}
        spaceBetween={20}
        notShowArrow
      >
        {(slide) => <Card title={slide?.name} />}
      </Slider>
      {/* <div className="flex w-full flex-wrap items-center justify-center gap-8 px-10 md:w-2/3 md:flex-nowrap md:px-0">
        {categories &&
          categories.map((category, index) => (
            <Card title={category?.name} key={`card-${index}`} />
          ))}
      </div> */}
    </div>
  );
};

export const Card = ({ title }) => {

  return (
    <div className="flex items-center justify-center gap-4 rounded-3xl border border-[#E5F4F2] bg-background p-4 text-center shadow-md flex-col h-[270px] min-h-[270px] max-h-[270px]">
      <div>
        <Image
          src={`/uploads/categoryIcons/${imagesUrls[title]}.png`}
          width={100}
          height={100}
          alt={title}
          className="w-[100px] h-[100px] object-cover"
        />
      </div>
      <div className="text-left md:text-center">
        <div className="text-xl font-[600]">{title}</div>
      </div>
      <div className="text-base text-[#2D2D2D] line-clamp-2">
        Lorem Ipsum is simply dummy text of the printing.
      </div>
    </div>
  );
};

export default Categories;
