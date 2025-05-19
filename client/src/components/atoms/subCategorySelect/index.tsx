"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@/hooks/generalHooks";
import React from "react";

const SubCategorySelect = ({
  control,
  label,
  placeholder,
  inputName,
}: {
  control: any;
  label?: string;
  placeholder?: string;
  inputName?: string;
}) => {
  const { data, isLoading: loading } = useQuery({
    url: "/subcategory",
    key: "subcategories",
  });

  const categories = data?.subcategories;
  return (
    <FormField
      control={control}
      name={inputName || "subcategoryId"}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || "Subcategory"}</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder || "Subcategory"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories &&
                categories?.map((category: any, i: number) => (
                  <SelectItem key={i} value={category?.id?.toString() ?? ""}>
                    {category?.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SubCategorySelect;
