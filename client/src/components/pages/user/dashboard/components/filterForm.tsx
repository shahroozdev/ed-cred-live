"use client";
import {
  Button,
  CategorySelect2,
  CountryDropdown,
  FormFeilds,
  FormTemplate,
} from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AppleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { z } from "zod";

const FilterForm = ({setIsOpen}:{setIsOpen?: Dispatch<SetStateAction<boolean>>}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onSubmit = (values: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    Object.keys(values).map((key) =>
      values[key] ? searchParams.set(key, values[key]) : {}
    );
    router.push(`?${searchParams}`);
    setIsOpen&&setIsOpen(false)
  };
  const defaultValues: Record<string, any> = {};

  searchParams.forEach((value, key) => {
    defaultValues[key] = value;
  });
  return (
    <FormTemplate
      onSubmit={onSubmit}
      schema={z.any()}
      defaultValues={defaultValues}
      className="p-3 space-y-4"
    >
      <FormFeilds
        fieldProps={{ name: "categoryId" }}
        label={{ text: "Filter by Category" }}
      >
        {(field) => (
          <CategorySelect2 value={field.value} onValueChange={field.onChange} />
        )}
      </FormFeilds>
      <FormFeilds
        fieldProps={{ name: "country" }}
        label={{ text: "Filter by  Country" }}
      >
        {(field) => (
          <CountryDropdown value={field.value} onChange={field.onChange} />
        )}
      </FormFeilds>
      <FormFeilds
        fieldProps={{ name: "school" }}
        label={{ text: "Filter by School" }}
      >
        {(field) => (
          <Input
            value={field.value}
            onChange={field.onChange}
            placeholder="Enter School Name"
          />
        )}
      </FormFeilds>
      <FormFeilds
        fieldProps={{ name: "ratting" }}
        label={{ text: "Filter by Rating" }}
      >
        {(field) => (
          <div className="border-[1px] rounded-md p-4 text-center">
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={field.onChange}
              className="h-auto flex flex-wrap gap-2"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <ToggleGroupItem value={String(10 - i)} key={i}>
                  {10 - i} <AppleIcon fill="red" stroke="red" />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}
      </FormFeilds>
      <div className="flex gap-2">
        <Button variant="ghost" type="reset" onClick={() => {router.push("?");setIsOpen&&setIsOpen(false)}}>
          Reset
        </Button>
        <Button variant="primary" type="submit">
          Apply
        </Button>
      </div>
    </FormTemplate>
  );
};

export default FilterForm;
