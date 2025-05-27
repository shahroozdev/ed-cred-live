"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutate } from "@/hooks/generalHooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/atoms";

const FormSchema = z.object({
    name: z.string().min(2, "The category must be at least 2 characters"),
    status: z.enum(["active", "draft"]),
    requiresVerification: z.boolean(),
});

export const AddCategory = () => {
    const {MutateFunc, isPending} = useMutate();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            status: "active",
            requiresVerification: false,
        },
    });

    const onSubmit = async(data: z.infer<typeof FormSchema>) => {
        await MutateFunc({url:'/category', method:'POST', body:data, tags:'categories', onSuccess:()=>form.reset()});
    };

    return (
        <div className="ring-2 ring-muted p-4 rounded-md">
            <div className="font-semibold text-xl mb-4">Add Category</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 grid-cols-1 justify-start gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category name" {...field} maxLength={100}  />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem >
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
                        name="requiresVerification"
                        render={({ field }) => (
                            <FormItem className="w-md flex gap-2 mt-5 ">
                                <FormLabel className="text-left flex-col items-start gap-1">
                                    Verification Required
                                </FormLabel>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full mt-3" loading={isPending}>Submit</Button>
                </form>
            </Form>
        </div>
    );
};
