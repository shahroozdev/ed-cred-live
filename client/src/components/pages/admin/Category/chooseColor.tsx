import { cn } from "@/lib/utils";
import React from "react";

const ChooseColor = ({ value, onChange }: { value: string; onChange: any }) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
    "indigo",
  ] as any;
  return (
    <div className="flex flex-wrap gap-2 cursor-pointer border-muted border-2 rounded-lg p-2">
      {colors?.map((color: string, index: number) => (
        <div
          key={index}
          onClick={() => onChange(color)}
          className={cn(
            "w-8 p-2 rounded-lg flex justify-center items-center",
            value === color ? "bg-red-100" : "bg-background"
          )}
        >
          <div className={`w-4 h-4 `} style={{ backgroundColor: color }} />
        </div>
      ))}
    </div>
  );
};

export default ChooseColor;
