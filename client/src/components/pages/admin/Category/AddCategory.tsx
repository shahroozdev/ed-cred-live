"use client";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutate } from "@/hooks/generalHooks";
import { Input } from "@/components/ui/input";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import ChooseCategoryIcon from "./chooseIcon";
import { Dispatch, SetStateAction } from "react";
import ChooseColor from "./chooseColor";

const FormSchema = z.object({
  name: z.string().min(2, "The category must be at least 2 characters"),
  status: z.enum(["active", "draft"]),
  iconUrl: z.string().optional(),
  color: z.string().min(1, "Color is required."),
});

export const AddCategory = ({data, setIsOpen}:{data?:Record<string, any>, setIsOpen?:Dispatch<SetStateAction<boolean>>}) => {
  const { MutateFunc, isPending } = useMutate();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    await MutateFunc({
      url: "/category",
      method: "POST",
      body: {...values, ...(data?.id?{id:data?.id}:{})},
      tags: "categories",
      onSuccess:()=>setIsOpen&&setIsOpen(false)
    });
  };

  return (
    <div className="ring-2 ring-muted p-4 rounded-md">
      {!data&&<div className="font-semibold text-xl mb-4">Add Category</div>}
      <FormTemplate
        onSubmit={onSubmit}
        defaultValues={{
          name: data?.name||"",
          status: data?.status||"active",
          iconUrl: data?.iconUrl||"",
          color: data?.color||"",
        }}
        schema={FormSchema}
        className="grid md:grid-cols-2 grid-cols-1 justify-start gap-4"
      >
        <FormFeilds fieldProps={{ name: "name"}} label={{ text: "Name" }}>
          {(field) => (
            <Input
              placeholder="Enter category name"
              {...field}
              maxLength={100}
            />
          )}
        </FormFeilds>

        <FormFeilds fieldProps={{ name: "status" }} label={{ text: "Status" }}>
          {(field) => (
            <Select
              onValueChange={(value) => field.onChange(value)}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormFeilds>
        <FormFeilds fieldProps={{ name: "iconUrl", className:"col-span-2"  }} label={{ text: "Icon" }}>
          {(field) => (
            <ChooseCategoryIcon value={field.value} onChange={field.onChange} />
          )}
        </FormFeilds>
        <FormFeilds fieldProps={{ name: "color", className:"col-span-2"  }} label={{ text: "Choose Apples Color" }}>
          {(field) => (
            <ChooseColor value={field.value} onChange={field.onChange} />
          )}
        </FormFeilds>

        <Button type="submit" className="w-full mt-3" loading={isPending}>
          Submit
        </Button>
      </FormTemplate>
    </div>
  );
};
