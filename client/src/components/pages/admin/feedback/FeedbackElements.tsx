"use client";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { QuestionFormSchema } from "@/lib/schemas";




export const MultipleChoiceInput = ({ form }: { form: UseFormReturn<z.infer<typeof QuestionFormSchema>> }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "options"
    });

    const options = form.watch("options");

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
                <Label>Options</Label>
                <div className="self-end flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            if (fields.length > 2) remove(fields.length - 1);
                        }}
                    >
                        <MinusIcon stroke="black" />
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            append({ value: "" })
                        }}
                    >
                        <PlusIcon stroke="black" />
                    </Button>
                </div>
            </div>

             {fields.map((_, i) => (
                <Input
                    key={i}
                    onChange={(e: any) => form.setValue(`options.${i}.value`, e.target.value)}
                    className="border p-2 rounded w-full mt-1"
                    placeholder={`Option ${i + 1}`}
                    maxLength={50}
                    required={i < 2}
                />
            ))}

            <Label className="block mt-2">Correct Answer</Label>
            <Select
                onValueChange={(value) => form.setValue("answer", value)}
                value={String(form.getValues("answer"))}
            >
                <SelectTrigger className="border p-2 rounded w-full">
                    <SelectValue placeholder="Select the correct answer" />
                </SelectTrigger>
                <SelectContent>
                    {options && options.map((option, i) => (
                        <SelectItem key={i} value={option.value || `Option ${i + 1}`}>
                            {option.value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export const QuestionTypeInput = ({ form }: { form: UseFormReturn<z.infer<typeof QuestionFormSchema>> }) => {
    return(
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>Question Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subcategory" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                            <SelectItem value="true_false">True/False</SelectItem>
                            <SelectItem value="open_ended">Open Ended</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}


