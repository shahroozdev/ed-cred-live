"use client";
import { Slider } from "@/components/molecules";
import { CategoryCard } from "@/components/atoms";

const Categories = ({categories}:{categories:Record<string, any>}) => {

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
        {(slide) => <CategoryCard title={slide?.name} desc="" icon={slide?.iconUrl}/>}
      </Slider>
    </div>
  );
};

export default Categories;
