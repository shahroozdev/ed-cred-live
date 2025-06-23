"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@/hooks/generalHooks";
import { SelectProps } from "@radix-ui/react-select";
import React from "react";
interface CategorySelect2Props extends SelectProps {}
const SchoolSelect = ({
  value,
  onValueChange,
  ...props
}: CategorySelect2Props) => {
  const { data: schools, isLoading: loading } = useQuery({
    url: "/school",
    key: "schools",
  });
  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className={`w-full`}>
        <SelectValue placeholder={"School Name"} />
      </SelectTrigger>
      <SelectContent>
        {schools &&
          schools?.map((school: any, i: number) => (
            <SelectItem key={i} value={school?.id?.toString() ?? ""}>
              {school?.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SchoolSelect;
