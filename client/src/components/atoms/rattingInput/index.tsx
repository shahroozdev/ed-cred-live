'use client'
import { colorVariants } from "@/data/constant";
import { cn } from "@/lib/utils";
import { AppleIcon } from "lucide-react";
import { useState } from "react";

// Rating Input Component
const RatingInput = ({ color, onChange }: { color: string, onChange: (value: number) => void }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRating = (value: number) => {
        setRating(value);
        onChange(value);
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 10 }).map((_, i) => {
                const isActive = rating >= 10 - i;
                const isHovered = hoverRating >= 10 - i;

                return (
                    <AppleIcon
                        key={`apple-${i}`}
                        className={cn(
                            colorVariants[color] || "text-gray-400 fill-gray-400 hover:fill-gray-300",
                            isActive ? "fill-current" : isHovered ? "fill-opacity-70" : "fill-opacity-30"
                        )}
                        onMouseOver={() => setHoverRating(10 - i)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRating(10 - i)}
                    />
                );
            })}
        </div>
    );
};

export default RatingInput;