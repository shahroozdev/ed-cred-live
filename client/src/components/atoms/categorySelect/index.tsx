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

const CategorySelect = ({
  control,
  label,
  placeholder,
  inputName,
  noLabel
}: {
  control: any;
  label?: string;
  placeholder?: string;
  inputName?: string;
  noLabel?:boolean;
}) => {
  const { data, isLoading: loading } = useQuery({
    url: "/category",
    key: "categories",
  });

  const categories = data?.categories;
  return (
    <FormField
      control={control}
      name={inputName || "categoryId"}
      render={({ field }) => (
        <FormItem className="w-full">
          {!noLabel?<FormLabel>{label || "Parent Category"}</FormLabel>:<></>}
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className={`w-full`}>
                <SelectValue placeholder={placeholder || "Parent Category"} />
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

export default CategorySelect;
