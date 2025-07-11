"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGlobalStore } from "@/hooks/generalHooks";
import { SelectProps } from "@radix-ui/react-select";
import React from "react";
interface CategorySelect2Props extends SelectProps {}

const SubCategorySelect2 = ({value,onValueChange, placeholder, ...props}:CategorySelect2Props &{placeholder?:string}) => {
  const [categories, schooles, subCategories] = useGlobalStore()

  return (
        <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className={`w-full`}>
        <SelectValue placeholder={placeholder||"Subcategories"} />
      </SelectTrigger>
      <SelectContent>
        {subCategories &&
          subCategories?.map((category: any, i: number) => (
            <SelectItem key={i} value={category?.id?.toString() ?? ""}>
              {category?.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SubCategorySelect2;
