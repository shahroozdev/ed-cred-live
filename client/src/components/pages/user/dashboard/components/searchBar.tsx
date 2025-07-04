"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { z } from "zod";

const SearchBar = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    Object.keys(values).map((key) =>
      values[key] ? searchParams.set(key, values[key]) : {}
    );
    startTransition(() => router.push(`?${searchParams}`));
  };
  const defaultValues: Record<string, any> = {
    search: searchParams.get("search") || "",
  };
  return (
    <FormTemplate
      onSubmit={onSubmit}
      schema={z.any()}
      className="w-full flex gap-2 p-4 border-[1px] rounded-md"
      defaultValues={defaultValues}
    >
      <FormFeilds
        fieldProps={{ name: "search", className:'w-full' }}
        // label={{ text: "Filter by Category" }}
      >
        {(field) => (
          <Input
            type="text"
            placeholder="Search for reviews"
            className="rounded-full py-3 text-base h-12 px-4 w-full"
            {...field}
          />
        )}
      </FormFeilds>
      <Button
        className="bg-primary rounded-full p-2 w-12 h-12 flex items-center cursor-pointer justify-center group"
        type="submit"
        loading={isPending}
      >
        {!isPending&&<SearchIcon className="text-white group-hover:text-primary" />}
      </Button>
    </FormTemplate>
  );
};

export default SearchBar;
