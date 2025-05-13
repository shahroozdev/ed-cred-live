"use client";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
interface SliderProps {
  slides: any;
  children: (slide: any) => ReactNode;
  className?: string;
  breakpoints?: Record<number, { slidesPerView: number }>;
  pagination?: boolean | Record<string, any>;
  spaceBetween?: number;
  notShowArrow?: boolean;
}
const Slider = ({
  children,
  slides,
  className,
  breakpoints,
  pagination,
  spaceBetween = 0,
  notShowArrow,
}: SliderProps) => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Pagination, A11y, Autoplay, Navigation]}
        autoplay={{ delay: 3000 }}
        speed={1000}
        breakpoints={breakpoints}
        loop
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        spaceBetween={spaceBetween}
        pagination={pagination}
        className={`w-full relative ${className}`}
      >
        {/* Custom arrows */}
        {!notShowArrow && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50">
            <button className="swiper-button-prev-custom bg-black/50 cursor-pointer hover:bg-black text-white p-2 rounded-l">
              &#10094;
            </button>
          </div>
        )}
        {!notShowArrow && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
            <button className="swiper-button-next-custom bg-black/50 text-white p-2 rounded-r cursor-pointer hover:bg-black">
              &#10095;
            </button>
          </div>
        )}
        {slides?.map((slide: Record<string, any>, index: number) => (
          <SwiperSlide key={index}>{children(slide)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
