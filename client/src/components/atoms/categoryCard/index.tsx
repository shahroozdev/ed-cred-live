import { imagesUrls } from '@/types';
import Image from 'next/image';
import React from 'react'

const CategoryCard = ({ title, desc }:{title:string, desc?:string}) => {
  return (
        <div className="flex items-center justify-center gap-4 rounded-3xl border border-[#E5F4F2] bg-background p-4 text-center shadow-md flex-col h-[270px] min-h-[270px] max-h-[270px]">
          <div>
            <Image
              src={`/uploads/categoryIcons/${imagesUrls[title]??'pricipal'}.png`}
              width={100}
              height={100}
              alt={title}
              className="w-[100px] h-[100px] object-cover"
            />
          </div>
          <div className="text-left md:text-center">
            <div className="text-xl font-[600]">{title}</div>
          </div>
          {desc?<div className="text-base text-[#2D2D2D] line-clamp-2">
            {desc}
          </div>:<></>}
        </div>
      );
}

export default CategoryCard