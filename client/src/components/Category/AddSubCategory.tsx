"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategoryStore, useSubCategoryStore } from "@/store/categoryStore";
import { Button } from "../ui/button";
import { useEffect } from "react";

const FormSchema = z.object({
    name: z.string().min(2, "The category must be at least 2 characters"),
    status: z.enum(["active", "draft"]),
    categoryId: z.string(),
});

export const AddSubCategory = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            status: "active",
        },
    });

    const { addCategory } = useSubCategoryStore();
    const { categories, fetchCategories } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, []);

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        addCategory(data);
    };

    return (
        <div className="ring-2 ring-muted p-4 rounded-md">
            <div className="font-semibold text-xl mb-4">Add Sub Category</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-end gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category name" {...field} maxLength={100} className="w-sm" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
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

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-lg min-w-[15rem]">
                                <FormLabel>Parent Category</FormLabel>
                                <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Parent Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            categories.map((category, i) => <SelectItem key={i} value={category.id?.toString() ?? ""}>{category.name}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="self-end">Submit</Button>
                </form>
            </Form>
        </div>
    );
};
