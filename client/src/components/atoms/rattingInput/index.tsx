"use client";
import { colorVariants } from "@/data/constant";
import { cn } from "@/lib/utils";
import { AppleIcon } from "lucide-react";
import { useState } from "react";

// Rating Input Component
const RatingInput = ({
  value = 0,
  color,
  onChange,
  disabled,
}: {
  value: any;
  color: string;
  onChange: (value: number) => void;
  disabled?:boolean;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center justify-end gap-2">
      {Array.from({ length: 10 }).map((_, i) => {
        const ratingValue = 10 - i;
        const isActive = value >= ratingValue;
        const isHovered = hoverRating >= 10 - i;

        return (
          <AppleIcon
            key={`apple-${i}`}
            className={cn("w-4 h-4 md:w-6 md:h-6",
              colorVariants[color] ||
                "text-gray-400 fill-gray-400 hover:fill-gray-300",
              isActive
                ? "fill-current"
                : isHovered
                ? "fill-opacity-70"
                : "fill-opacity-30"
            )}
            onMouseOver={() => setHoverRating(10 - i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => !disabled&&onChange(10 - i)}
          />
        );
      })}
    </div>
  );
};

export default RatingInput;
