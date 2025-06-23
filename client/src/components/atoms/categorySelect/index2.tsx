"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGlobalStore, useQuery } from "@/hooks/generalHooks";
import { SelectProps } from "@radix-ui/react-select";
import React from "react";
interface CategorySelect2Props extends SelectProps {}
const CategorySelect2 = ({value,onValueChange, ...props}:CategorySelect2Props) => {
  const [categories] = useGlobalStore()

  return (
        <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className={`w-full`}>
        <SelectValue placeholder={"Category"} />
      </SelectTrigger>
      <SelectContent>
        {categories &&
          categories?.map((category: any, i: number) => (
            <SelectItem key={i} value={category?.id?.toString() ?? ""}>
              {category?.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect2;
