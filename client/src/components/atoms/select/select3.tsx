import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const Select3 = ({
  placeholder,
  onValueChange,
  value,
  options,
}: {
  placeholder?: string;
  onValueChange: (value: string) => void;
  value: string;
  options: { value: string; label: string }[];
}) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={`w-full`}>
        <SelectValue placeholder={placeholder || "Parent Category"} />
      </SelectTrigger>
      <SelectContent>
        {options &&
          options?.map((option: any, i: number) => (
            <SelectItem key={i} value={option.value ?? ""}>
              {option?.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Select3;
