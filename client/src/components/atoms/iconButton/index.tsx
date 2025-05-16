import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const IconButton = ({
  bgColor,
  children,
  circle,
  className,
}: {
  bgColor: string;
  children: ReactNode;
  circle?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        circle ? "rounded-full" : "rounded-[8px]",
        "w-8 h-8 flex justify-center items-center",
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
};

export default IconButton;
