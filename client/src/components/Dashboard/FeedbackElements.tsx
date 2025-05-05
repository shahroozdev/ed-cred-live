"use client";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { GeneralFormSchema, QuestionFormSchema } from "./FeedbackForm";
import { Button } from "../ui/button";
import { AppleIcon, CheckIcon, MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Question, useQuestionStore } from "@/store/questionStore";
import { v4 as uuidv4 } from "uuid";
import { useCategoryStore } from "@/store/categoryStore";
import { useEffect } from "react";

export const TitleInput = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Feedback Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter feedback title" {...field} maxLength={100} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const QuestionSelectInput = ({ form }: {form: UseFormReturn<z.infer<typeof QuestionFormSchema>>}) => {
    return (
        <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Ask a question" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

// export const CategoryInput = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
//     const { categories, fetchCategories } = useCategoryStore();
//     useEffect(() => {
//         fetchCategories();
//     }, []);
//
//     return (
//         <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//                 <FormItem className="w-full">
//                     <FormLabel>Category</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
//                         <FormControl>
//                             <SelectTrigger className="w-full">
//                                 <SelectValue placeholder="Select a category" />
//                             </SelectTrigger>
//                         </FormControl>
//                         <SelectContent className="">
//                             {
//                                 categories.map((category) => <SelectItem value={category.id?.toString() ?? ""} key={category.id}>{category.name}</SelectItem>)
//                             }
//                         </SelectContent>
//                     </Select>
//                     <FormMessage />
//                 </FormItem>
//             )}
//         />
//     )
// }

export const UserCategoryInput = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
    const { categories, fetchCategories } = useCategoryStore();
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <FormField
            control={form.control}
            name="userCategoryId"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>User Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                            {
                                categories.map((category) => <SelectItem value={category.id?.toString() ?? ""} key={category.id}>{category.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const FormCategoryInput = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
    const { categories, fetchCategories } = useCategoryStore();
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <FormField
            control={form.control}
            name="formCategoryId"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>Form Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                            {
                                categories.map((category) => <SelectItem value={category.id?.toString() ?? ""} key={category.id}>{category.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

// export const SubCategoryInput = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
//     const { categories, fetchCategories } = useSubCategoryStore();
//     useEffect(() => {
//         fetchCategories();
//     }, []);
//
//     return (
//         <FormField
//             control={form.control}
//             name="subcategory"
//             render={({ field }) => (
//                 <FormItem className="w-full">
//                     <FormLabel>Subcategory</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                             <SelectTrigger className="w-full">
//                                 <SelectValue placeholder="Select a subcategory" />
//                             </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                             {
//                                 categories.length > 0 &&
//                                 categories.filter(category => category.parentCategory.id?.toString()  == form.watch("category"))
//                                 .map((category) => <SelectItem value={category.id?.toString() ?? ""} key={category.id}>{category.name}</SelectItem>)
//                             }
//                         </SelectContent>
//                     </Select>
//                     <FormMessage />
//                 </FormItem>
//             )}
//         />
//     )
// }

export const StatusInput = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
    return (
        <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>Form Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subcategory" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const SwitchInput = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
    console.log();
    return (
        <div className="flex flex-col gap-4">
            <Label>Feedback Details</Label>
            <div className="flex flex-wrap gap-4">
                {Object.keys(form.getValues('details')).map((detail) => (
                    <FormField
                        key={detail}
                        control={form.control}
                        name={`details.${detail}` as any}
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between">
                                <Label className="capitalize">{detail}</Label>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                ))}
            </div>
        </div>
    )
}

export const TrueFalseInput = ({ form }: { form: UseFormReturn<z.infer<typeof QuestionFormSchema>> }) => {
    return (
        <div className="flex flex-col gap-2">
            <Label>Correct Answer</Label>
            <Select
                onValueChange={(value) => form.setValue("questionCorrectAnswer", value)}
                defaultValue={form.getValues("questionCorrectAnswer")?.toString()}
            >
                <SelectTrigger className="border p-2 rounded w-full">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="true"><CheckIcon />True</SelectItem>
                    <SelectItem value="false"><XIcon />False</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export const RatingInput = ({ form }: { form: UseFormReturn<z.infer<typeof QuestionFormSchema>> }) => {
    return (
        <div className="flex flex-col gap-2">
            <Label>Rating Options</Label>
            <Select
                onValueChange={(value) => form.setValue("questionCorrectAnswer", value)}
                defaultValue={form.getValues("questionCorrectAnswer")?.toString()}
            >
                <SelectTrigger className="border p-2 rounded w-full">
                    <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                            {num} {Array.from({length: num}).map(_ => <AppleIcon key={`apple-${uuidv4()}`} fill="green" stroke="green" />)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export const MultipleChoiceInput = ({ form }: { form: UseFormReturn<z.infer<typeof QuestionFormSchema>> }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questionOptions"
    });

    const options = form.watch("questionOptions");

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
                    onChange={(e: any) => form.setValue(`questionOptions.${i}.value`, e.target.value)}
                    className="border p-2 rounded w-full mt-1"
                    placeholder={`Option ${i + 1}`}
                    maxLength={50}
                    required={i < 2}
                />
            ))}

            <Label className="block mt-2">Correct Answer</Label>
            <Select
                onValueChange={(value) => form.setValue("questionCorrectAnswer", value)}
                defaultValue={form.getValues("questionCorrectAnswer")}
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
            name="questionType"
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

export const QuestionInput = ({ form }: { form: UseFormReturn<z.infer<typeof QuestionFormSchema>> }) => {
  const questionType = form.watch("questionType");

  return (
        <div className="">
            {questionType === "multiple_choice" && <MultipleChoiceInput form={form} />}
            {questionType === "true_false" && <TrueFalseInput form={form} />}
            {questionType === "rating" && <RatingInput form={form} />}
            {questionType === "open_ended" && <div></div>}
        </div>
    );
};

export const AddQuestion = ({ form }: { form: UseFormReturn<z.infer<typeof QuestionFormSchema>> }) => {
    const { addQuestion } = useQuestionStore();
    const handleClick = () => {
        const data = form.getValues();

        const newQuestion: Question = {
            id: uuidv4(),
            type: data.questionType,
            text: data.question,
            options: data.questionType === "multiple_choice" ? data.questionOptions || [] : undefined,
            answer: data.questionType !== "open_ended" ? data.questionCorrectAnswer : undefined,
        };
        addQuestion(newQuestion);

        form.resetField("question");
        form.resetField("questionOptions");
    };

    return(
        <Button className="" variant={"default"} onClick={handleClick} disabled={!form.formState.isValid}>
            <PlusIcon /> Add Question
        </Button>
    )
}
