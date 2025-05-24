"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutate } from "@/hooks/generalHooks";
import { Button, CategorySelect } from "../atoms";

const FormSchema = z.object({
  name: z.string().min(2, "The category must be at least 2 characters"),
  status: z.enum(["active", "draft"]),
  // categoryId: z.string(),
});

export const AddSubCategory = () => {
  const { MutateFunc, isPending } = useMutate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      status: "active",
      // categoryId: "", // Include this!
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    await MutateFunc({
      url: "/subcategory",
      method: "POST",
      body: data,
      tags: "subcategories",
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="ring-2 ring-muted p-4 rounded-md">
      <div className="font-semibold text-xl mb-4">Add Sub Category</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 grid-cols-1 justify-start gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter category name"
                    {...field}
                    maxLength={100}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <CategorySelect control={form.control} /> */}

          <Button type="submit" className="self-end" loading={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
