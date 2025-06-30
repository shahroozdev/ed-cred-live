"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutate } from "@/hooks/generalHooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import ChooseCategoryIcon from "./chooseIcon";

const FormSchema = z.object({
  name: z.string().min(2, "The category must be at least 2 characters"),
  status: z.enum(["active", "draft"]),
  requiresVerification: z.boolean(),
});

export const AddCategory = ({data}:{data?:Record<string, any>}) => {
  const { MutateFunc, isPending } = useMutate();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await MutateFunc({
      url: "/category",
      method: "POST",
      body: data,
      tags: "categories",
    });
  };

  return (
    <div className="ring-2 ring-muted p-4 rounded-md">
      <div className="font-semibold text-xl mb-4">Add Category</div>
      <FormTemplate
        onSubmit={onSubmit}
        defaultValues={{
          name: data?.name||"",
          status: data?.status||"active",
          iconUrl: data?.iconUrl||"",
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

        <Button type="submit" className="w-full mt-3" loading={isPending}>
          Submit
        </Button>
      </FormTemplate>
    </div>
  );
};
