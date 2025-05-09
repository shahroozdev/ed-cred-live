"use client";

import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
    CategoryInput,
    QuestionInput,
    StatusInput,
    SubCategoryInput,
    SwitchInput,
    TitleInput,
    QuestionSelectInput,
    QuestionTypeInput,
    AddQuestion
} from "./FeedbackElements";
import { Button } from "../ui/button";
import { Feedback, useFeedbackStore } from "@/store/createFeedbackStore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

export const GeneralFormSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(50, "Title must be under 50 characters"),
    category: z.string(),
    subcategory: z.string().min(1, "Subcategory is required"),
    status: z.enum(["active", "inactive"]),
    details: z.object({
        // common
        salary: z.boolean(),
        schoolName:      z.boolean(),
        schoolWebsite:   z.boolean(),
        schoolCountry: z.boolean(),
        reportingPeriod: z.boolean(),

        // for the category pricipal
        pricipalName:    z.boolean(),
        pricipalDivison: z.boolean(),

        // for the category director
        directorName: z.boolean(),

    })
});

export const QuestionFormSchema = z.object({
    question: z.string().min(4, "The question needs to be atleast 4 characters!"),
    questionType: z.enum(["rating", "multiple_choice", "true_false", "open_ended"], {
        required_error: "Question type is required",
    }),
    questionOptions: z.array(z.object({value: z.string().min(2, "The option must be altest 2 characters!")})).optional(),
    questionCorrectAnswer: z.string().optional(),
});

const FeedbackForm = () => {

    const questionForm = useForm<z.infer<typeof QuestionFormSchema>>({
        resolver: zodResolver(QuestionFormSchema),
        defaultValues: {
            question: "",
            questionType: "rating",
        }
    });

    const form = useForm<z.infer<typeof GeneralFormSchema>>({
        resolver: zodResolver(GeneralFormSchema),
        defaultValues: {
            title: "",
            subcategory: "",
            details: {
                salary:          false,
                schoolName:      false,
                schoolWebsite:   false,
                schoolCountry:   false,
                reportingPeriod: false,
                pricipalName:    false,
                pricipalDivison: false,
                directorName:    false,
            },
            status: "inactive",
        },
    });

    const onSubmit = (data: z.infer<typeof GeneralFormSchema>) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="flex items-center justify-between">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col items-start justify-between gap-10">
                    <MetaDataInput form={form} />
                    <div className="flex w-full flex-col gap-4">
                        <div className="">
                            <div className="text-2xl font-semibold">Questions</div>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Ask the users questions.
                            </p>
                        </div>
                        <QuestionSelectInput form={questionForm} />
                        <QuestionTypeInput form={questionForm} />
                        <QuestionInput form={questionForm} />
                        <AddQuestion form={questionForm} />
                    </div>
                </form>
            </Form>
        </div>
    );
};

const MetaDataInput = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
    const [collapsed, setCollapsed] = useState(false);
    return(
        <div className="outline-muted relative flex w-full flex-col gap-4 rounded-md p-6 outline-2 isolate shadow-sm">
            <ChevronDownIcon 
                className={`absolute right-6 top-6 transition-transform ${collapsed ? "rotate-0" : "rotate-180"}`} 
                onClick={() => setCollapsed(s => !s)}
            />
            <div className={`${collapsed ? "opacity-100" : "opacity-0"} bg-destructive text-white absolute bottom-6 right-6 rounded-sm text-sm px-3 py-1 -z-10`}>
                required
            </div>
            <div className="">
                <div className="text-2xl font-semibold">Form Metadata</div>
                <p className="text-muted-foreground mb-0 text-sm">Metadata means data about data. This is information about the feedback form.</p>
            </div>
            <div className={`mt-2 flex flex-col gap-4 overflow-hidden transition-[max-height]`} >
                <TitleInput form={form} />
                <div className="flex gap-2">
                    <CategoryInput form={form} />
                    <SubCategoryInput form={form} />
                </div>
                <StatusInput form={form} />
                <SwitchInput form={form} />
                <SubmitButton form={form} />
            </div>
        </div>
    )
}

const SubmitButton = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
    const { setFeedback } = useFeedbackStore();
    const handleFeedbackSave = () => {
        const data = form.getValues();
        const feedback: Feedback = {
            id: uuidv4(),
            ...data,
        };
        setFeedback(feedback);
        toast("Feedback Saved successfully!");
    }
    return (
        <Button disabled={!form.formState.isValid} onClick={handleFeedbackSave} className="mt-2">
            Save Metadata
        </Button>
    )
}

export default FeedbackForm;
