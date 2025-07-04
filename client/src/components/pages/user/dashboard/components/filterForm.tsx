"use client";
import {
  Button,
  CategorySelect2,
  CountryDropdown,
  FormFeilds,
  FormTemplate,
  ResetBtn,
  SchoolSelect,
} from "@/components/atoms";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AppleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { z } from "zod";

const FilterForm = ({
  setIsOpen,
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const onSubmit = (values: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    Object.keys(values).map((key) =>
      values[key] ? searchParams.set(key, values[key]) : {}
    );
    startTransition(() => router.push(`?${searchParams}`));
    setIsOpen && setIsOpen(false);
  };
  const defaultValues: Record<string, any> = {
    categoryId: searchParams.get("categoryId") || "", // could be null, use ""
    country: searchParams.get("country") || "",
    school: searchParams.get("school") || "",
    ratting: searchParams.get("ratting") || "",
  };

  console.log(defaultValues, 'default');
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
          <CategorySelect2
            {...field}
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      </FormFeilds>
      <FormFeilds
        fieldProps={{ name: "country" }}
        label={{ text: "Filter by  Country" }}
      >
        {(field) => (
          <CountryDropdown
            {...field}
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      </FormFeilds>
      <FormFeilds
        fieldProps={{ name: "school" }}
        label={{ text: "Filter by School" }}
      >
        {(field) => (
          <SchoolSelect
            {...field}
            value={field.value}
            onValueChange={field.onChange}
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
              {Array.from({ length: 5 }, (_, i) => (
                <ToggleGroupItem value={String(i + 1)} key={i}>
                  {i + 1} <AppleIcon fill="red" stroke="red" />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}
      </FormFeilds>
      <div className="flex gap-2">
        <ResetBtn setIsOpen={setIsOpen} />
        <Button variant="primary" type="submit" loading={isPending}>
          Apply
        </Button>
      </div>
    </FormTemplate>
  );
};

export default FilterForm;
